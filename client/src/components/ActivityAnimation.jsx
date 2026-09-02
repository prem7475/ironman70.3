import React from 'react';
import { Bike, Dumbbell, Footprints, Waves } from 'lucide-react';
import './ActivityAnimation.css';

const activities = {
  marathon: { label: 'Runner in motion', Icon: Footprints },
  running: { label: 'Runner in motion', Icon: Footprints },
  cycling: { label: 'Cyclist in motion', Icon: Bike },
  swimming: { label: 'Swimmer in motion', Icon: Waves },
  triathlon: { label: 'Triathlete in motion', Icon: Dumbbell },
  duathlon: { label: 'Duathlete in motion', Icon: Footprints },
  'devils circuit': { label: 'Obstacle athlete in motion', Icon: Dumbbell },
  ironman: { label: 'IRONMAN athlete in motion', Icon: Bike },
  hyrox: { label: 'HYROX athlete in motion', Icon: Dumbbell }
};

const ActivityAnimation = ({ category = 'marathon', compact = false }) => {
  const activity = activities[String(category).toLowerCase()] || activities.marathon;
  const Icon = activity.Icon;
  return <div className={`activity-animation ${compact ? 'activity-animation--compact' : ''}`} role="status" aria-label={activity.label}>
    <div className="activity-animation__track"><span /><span /><span /></div>
    <Icon className="activity-animation__athlete" aria-hidden="true" />
    <div className="activity-animation__pulse" />
  </div>;
};

export default ActivityAnimation;
