import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './DriftWall.css';

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const columnFactor = (index, variance) => 1 + variance * ((((index * 0.6180339887 + 0.35) % 1) * 2) - 1);

const DriftWall = ({ items = [], columns = 5, tileWidth = 200, tileHeight = 132, gap = 18, radius = 14, tilt = 12, turn = -8, perspective = 1200, depth = 120, speed = 42, direction = 'up', variance = 0.45, parallax = 0.6, pauseOnHover = false, lift = 64, dim = 0.55, overlayColor = '#060606', className = '' }) => {
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const tracksRef = useRef([]);
  const offsetsRef = useRef([]);
  const velocitiesRef = useRef([]);
  const pointerRef = useRef({ x: 0, y: 0 });
  const dampedPointerRef = useRef({ x: 0, y: 0 });
  const [height, setHeight] = useState(600);
  const [reduced, setReduced] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = event => setReduced(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;
    const observer = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height || 600));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const columnsData = useMemo(() => {
    const result = Array.from({ length: columns }, () => []);
    items.forEach((item, index) => result[index % columns].push(item));
    return result.map(column => column.length ? column : items.slice(0, 1));
  }, [columns, items]);
  const metadata = useMemo(() => columnsData.map(column => {
    const copyHeight = Math.max(tileHeight + gap, column.length * (tileHeight + gap));
    return { copyHeight, copies: Math.max(2, Math.ceil((height * 1.6) / copyHeight) + 1) };
  }), [columnsData, gap, height, tileHeight]);
  const baseVelocity = useMemo(() => columnsData.map((_, index) => speed * columnFactor(index, variance) * (direction === 'up' ? 1 : -1) * (index % 2 ? -1 : 1)), [columnsData, direction, speed, variance]);

  useEffect(() => {
    offsetsRef.current = metadata.map((meta, index) => meta.copyHeight * ((index * 0.37) % 1));
    velocitiesRef.current = metadata.map(() => 0);
  }, [metadata]);

  const applyPlane = useCallback(() => {
    if (!planeRef.current) return;
    planeRef.current.style.transform = `translate(-50%, -50%) scale(1.12) rotateX(${tilt - dampedPointerRef.current.y}deg) rotateY(${turn + dampedPointerRef.current.x}deg) translateZ(${-depth}px)`;
  }, [depth, tilt, turn]);

  useEffect(() => {
    let frameId;
    let previous;
    const animate = timestamp => {
      const delta = Math.min(0.05, previous ? (timestamp - previous) / 1000 : 0);
      previous = timestamp;
      const damp = 1 - Math.exp(-delta / 0.12);
      const maxParallax = parallax * 8;
      dampedPointerRef.current.x += (pointerRef.current.x * maxParallax - dampedPointerRef.current.x) * damp;
      dampedPointerRef.current.y += (-pointerRef.current.y * maxParallax - dampedPointerRef.current.y) * damp;
      applyPlane();
      if (!reduced) tracksRef.current.forEach((track, index) => {
        const meta = metadata[index];
        if (!track || !meta) return;
        const target = pauseOnHover ? 0 : baseVelocity[index];
        velocitiesRef.current[index] += (target - velocitiesRef.current[index]) * (1 - Math.exp(-delta / 0.28));
        offsetsRef.current[index] = ((offsetsRef.current[index] + velocitiesRef.current[index] * delta) % meta.copyHeight + meta.copyHeight) % meta.copyHeight;
        track.style.transform = `translate3d(0, ${-offsetsRef.current[index]}px, 0)`;
      });
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [applyPlane, baseVelocity, metadata, parallax, pauseOnHover, reduced]);

  const cssVars = { '--dw-tile-w': `${tileWidth}px`, '--dw-tile-h': `${tileHeight}px`, '--dw-gap': `${gap}px`, '--dw-radius': `${radius}px`, '--dw-perspective': `${perspective}px`, '--dw-lift': `${lift}px`, '--dw-dim': dim, '--dw-overlay': overlayColor };
  return <div ref={containerRef} className={`drift-wall ${reduced ? 'drift-wall--reduced' : ''} ${className}`} style={cssVars} onPointerMove={event => { const rect = containerRef.current?.getBoundingClientRect(); if (rect && !reduced) pointerRef.current = { x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 }; }} onPointerLeave={() => { pointerRef.current = { x: 0, y: 0 }; }}>
    <div ref={planeRef} className="drift-wall__plane">
      {columnsData.map((column, columnIndex) => <div className="drift-wall__column" key={`column-${columnIndex}`}><div className="drift-wall__track" ref={element => { tracksRef.current[columnIndex] = element; }}>{Array.from({ length: metadata[columnIndex].copies }).flatMap((_, copyIndex) => column.map((item, itemIndex) => { const id = `${columnIndex}-${copyIndex}-${itemIndex}`; return <div key={id} tabIndex={0} className={`drift-wall__tile ${activeId === id ? 'is-active' : ''}`} onFocus={() => setActiveId(id)} onBlur={() => setActiveId(null)}><span className="drift-wall__inner"><img src={item.image} alt={item.title || ''} loading="lazy" /><span className="drift-wall__overlay" /></span></div>; }))}</div></div>)}
    </div>
  </div>;
};

export default DriftWall;
