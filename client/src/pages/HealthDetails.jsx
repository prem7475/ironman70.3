import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, Scale, Ruler, ChevronRight, CheckCircle2,
  AlertCircle, User, Droplets, Utensils, Zap,
  Dumbbell, Moon, Info, ArrowRight, Target, ChevronDown
} from 'lucide-react';
import useStore from '../store/useStore';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const HealthDetails = () => {
  const user = useStore(state => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    heightCm: '',
    weightKg: '',
    heightFt: '',
    heightIn: '',
    weightLbs: '',
    age: '',
    gender: 'male',
    heightUnit: 'cm', // 'cm' or 'ft'
    weightUnit: 'kg'  // 'kg' or 'lbs'
  });
  const [analysisResult, setAnalysisResult] = useState(null);
  const [vo2Message, setVo2Message] = useState('');
  const [vo2Distance, setVo2Distance] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/health');
      return;
    }
    const token = localStorage.getItem('paceforge_token');
    fetch(`${API_URL}/user/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => response.ok ? response.json() : null)
      .then(account => {
        const health = account?.healthDetails;
        if (!health) return;
        setFormData(current => ({ ...current, name: account.name, heightCm: health.height || '', weightKg: health.weight || '', age: health.age || '', gender: health.gender || 'male' }));
        if (health.bmi) setAnalysisResult({ bmi: health.bmi, status: health.bmiCategory || 'Normal', color: health.bmiCategory === 'Normal' ? 'text-green-400' : 'text-primary', name: account.name });
      });
  }, [user, navigate]);

  const calculateBMI = (e) => {
    e.preventDefault();
    let height, weight;

    // Standardize Height to meters
    if (formData.heightUnit === 'cm') {
      height = parseFloat(formData.heightCm) / 100;
    } else {
      const totalInches = (parseFloat(formData.heightFt) * 12) + parseFloat(formData.heightIn);
      height = totalInches * 0.0254;
    }

    // Standardize Weight to kg
    if (formData.weightUnit === 'kg') {
      weight = parseFloat(formData.weightKg);
    } else {
      weight = parseFloat(formData.weightLbs) * 0.453592;
    }

    if (height > 0 && weight > 0) {
      const bmiValue = Number((weight / (height * height)).toFixed(2));

      let status = '';
      let color = '';
      if (bmiValue < 18.5) { status = 'Underweight'; color = 'text-blue-400'; }
      else if (bmiValue < 25) { status = 'Normal'; color = 'text-green-400'; }
      else if (bmiValue < 30) { status = 'Overweight'; color = 'text-orange-400'; }
      else { status = 'Obesity'; color = 'text-primary'; }

      setAnalysisResult({
        bmi: bmiValue,
        status,
        color,
        name: formData.name || 'Athlete'
      });
      const token = localStorage.getItem('paceforge_token');
      fetch(`${API_URL}/user/health-details`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ height: formData.heightUnit === 'cm' ? Number(formData.heightCm) : height * 100, weight, age: formData.age, gender: formData.gender }) });
    }
  };

  const recommendationPacks = useMemo(() => {
    if (!analysisResult) return [];

    return [
      {
        type: 'Reduce Weight',
        description: 'Elite fat loss protocols focusing on metabolic efficiency and lean muscle retention.',
        recommended: analysisResult.bmi >= 25,
        packs: [
          {
            title: 'Aggressive Shred',
            diet: 'High protein (2.2g/kg), low carb (<50g), focus on fibrous greens and omega-3 fats.',
            exercise: '5x Weekly HIIT + Heavy Compound Lifts to maintain strength.',
            protein: '180g - 200g Daily',
            water: '4.5 Liters Daily',
            details: 'Maintain 7-8 hours sleep. Use cold showers to boost brown fat thermogenesis.'
          },
          {
            title: 'Sustainable Cut',
            diet: 'Moderate carb cycling. Complex carbs on training days, high fat on rest days.',
            exercise: '3x Strength sessions, 2x Zone 2 Cardio (45 mins).',
            protein: '1.8g/kg of body weight',
            water: '3.5 Liters Daily',
            details: 'Focus on NEAT (Non-Exercise Activity Thermogenesis) - 10k steps minimum.'
          }
        ]
      },
      {
        type: 'Maintain Weight',
        description: 'Performance optimization by balancing energy intake with intensive training demands.',
        recommended: analysisResult.bmi >= 18.5 && analysisResult.bmi < 25,
        packs: [
          {
            title: 'Body Recomposition',
            diet: 'Maintenance calories. High protein, moderate carbs, moderate fats.',
            exercise: 'Progressive overload training 4x weekly. Focus on weak points.',
            protein: '2g/kg of body weight',
            water: '4 Liters Daily',
            details: 'Optimizing micronutrient density. Focus on gut health and probiotics.'
          }
        ]
      },
      {
        type: 'Gain Weight',
        description: 'Hypertrophy focused protocols for building elite athletic power and scale.',
        recommended: analysisResult.bmi < 18.5,
        packs: [
          {
            title: 'Clean Bulk',
            diet: 'Surplus of 300-500 kcal. Quality carbs (Rice, Oats, Sweet Potato) + Lean proteins.',
            exercise: 'Hypertrophy specific (8-12 rep range). 5x Weekly. Minimal cardio.',
            protein: '2.2g/kg of body weight',
            water: '4.5 Liters Daily',
            details: 'Creatine monohydrate supplementation recommended (5g daily).'
          },
          {
            title: 'Power Build',
            diet: 'Aggressive surplus. High density nutrient shakes between meals.',
            exercise: 'Focus on big 3 (Squat, Bench, Deadlift) + functional carry work.',
            protein: '160g+ Daily',
            water: '4 Liters Daily',
            details: 'Maximized recovery. Magnesium supplementation before bed for muscle repair.'
          }
        ]
      }
    ];
  }, [analysisResult]);

  if (user && user.membershipStatus !== 'ACTIVE') return <div className="pt-32 pb-20 min-h-screen max-w-2xl mx-auto px-6 text-center"><Activity className="text-primary mx-auto mb-6" size={64} /><p className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">Premium athlete intelligence</p><h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mt-3">Unlock your <span className="text-primary">metrics</span></h1><p className="text-gray-400 mt-5">BMI, VO2 Max, training plans, and athlete recommendations are included with the ₹4,999 yearly Forger membership.</p><Link to="/membership" className="hero-button inline-block mt-8">Become a Forger</Link></div>;

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 font-ironman">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3 block">Biometric Intelligence</span>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">Training <span className="text-primary">Portal</span></h1>
            <div className="h-1.5 w-32 bg-primary mt-4 rounded-full"></div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Input Section */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-10 border-none relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <form onSubmit={calculateBMI} className="space-y-8">
                <div className="space-y-6">
                  <div className="group">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-3 block">Athlete Identity</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={18} />
                      <input
                        type="text"
                        placeholder="FULL NAME"
                        className="input-hero pl-12 py-4"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {['male', 'female'].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData({...formData, gender: g})}
                        className={`py-4 rounded-lg uppercase font-black text-[10px] tracking-widest border-2 transition-all ${formData.gender === g ? 'border-primary bg-primary/10 text-white shadow-[0_0_20px_rgba(225,6,0,0.2)]' : 'border-white/5 bg-white/5 text-gray-500 hover:border-white/20'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>

                  {/* Height Unit Selection */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Height System</label>
                      <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-full ml-6">
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, heightUnit: 'cm'})}
                          className={`flex-1 py-3 rounded-lg text-xs font-black uppercase transition-all flex items-center justify-center space-x-2 ${formData.heightUnit === 'cm' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-white'}`}
                        >
                          <span>Centimeters (CM)</span>
                          <ChevronDown size={14} className={formData.heightUnit === 'cm' ? 'opacity-100' : 'opacity-0'} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, heightUnit: 'ft'})}
                          className={`flex-1 py-3 rounded-lg text-xs font-black uppercase transition-all flex items-center justify-center space-x-2 ${formData.heightUnit === 'ft' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-white'}`}
                        >
                          <span>Feet / Inches</span>
                          <ChevronDown size={14} className={formData.heightUnit === 'ft' ? 'opacity-100' : 'opacity-0'} />
                        </button>
                      </div>
                    </div>

                    {formData.heightUnit === 'cm' ? (
                      <div className="relative group">
                        <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                          type="number"
                          placeholder="STATURE (CM)"
                          className="input-hero pl-12 py-5 text-lg"
                          value={formData.heightCm}
                          onChange={(e) => setFormData({...formData, heightCm: e.target.value})}
                          required
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="number"
                          placeholder="FEET"
                          className="input-hero py-5 text-lg text-center"
                          value={formData.heightFt}
                          onChange={(e) => setFormData({...formData, heightFt: e.target.value})}
                          required
                        />
                        <input
                          type="number"
                          placeholder="INCHES"
                          className="input-hero py-5 text-lg text-center"
                          value={formData.heightIn}
                          onChange={(e) => setFormData({...formData, heightIn: e.target.value})}
                          required
                        />
                      </div>
                    )}
                  </div>

                  {/* Weight Unit Selection */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Weight System</label>
                      <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-full ml-6">
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, weightUnit: 'kg'})}
                          className={`flex-1 py-3 rounded-lg text-xs font-black uppercase transition-all flex items-center justify-center space-x-2 ${formData.weightUnit === 'kg' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-white'}`}
                        >
                          <span>Kilograms (KG)</span>
                          <ChevronDown size={14} className={formData.weightUnit === 'kg' ? 'opacity-100' : 'opacity-0'} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, weightUnit: 'lbs'})}
                          className={`flex-1 py-3 rounded-lg text-xs font-black uppercase transition-all flex items-center justify-center space-x-2 ${formData.weightUnit === 'lbs' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:text-white'}`}
                        >
                          <span>Pounds (LBS)</span>
                          <ChevronDown size={14} className={formData.weightUnit === 'lbs' ? 'opacity-100' : 'opacity-0'} />
                        </button>
                      </div>
                    </div>

                    {formData.weightUnit === 'kg' ? (
                      <div className="relative group">
                        <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                          type="number"
                          placeholder="MASS (KG)"
                          className="input-hero pl-12 py-5 text-lg"
                          value={formData.weightKg}
                          onChange={(e) => setFormData({...formData, weightKg: e.target.value})}
                          required
                        />
                      </div>
                    ) : (
                      <div className="relative group">
                        <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                          type="number"
                          placeholder="MASS (LBS)"
                          className="input-hero pl-12 py-5 text-lg"
                          value={formData.weightLbs}
                          onChange={(e) => setFormData({...formData, weightLbs: e.target.value})}
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" className="hero-button w-full py-5 text-sm group">
                  <span className="flex items-center justify-center">
                    Compute Metrics <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </span>
                </button>
              </form>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mt-5">12-minute run distance (metres)<input type="number" min="500" max="6000" value={vo2Distance} onChange={event => setVo2Distance(event.target.value)} placeholder="E.G. 2400" className="input-hero mt-2 py-4" /></label>
              <button type="button" onClick={async () => { const token = localStorage.getItem('paceforge_token'); const response = await fetch(`${API_URL}/user/vo2-max`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ distanceMeters: vo2Distance }) }); const data = await response.json(); setVo2Message(data.msg || `Estimated VO₂ Max: ${data.vo2Max} ml/kg/min`); }} className="hero-button w-full mt-4 py-4 text-[10px]">Update My VO₂ Max</button>
              {vo2Message && <p className="text-xs text-gray-400 mt-4 uppercase tracking-widest">{vo2Message}</p>}
            </motion.div>
          </div>

          {/* Results & Recommendations Section */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!analysisResult ? (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center p-12 glass-card border-dashed border-2 border-white/5 opacity-40 text-center"
                >
                  <Activity size={80} className="mb-6 text-primary animate-pulse" />
                  <h3 className="text-2xl font-black uppercase italic mb-2">Awaiting Input Data</h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">Configure your biometrics to generate elite protocols</p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-12"
                >
                  {/* BMI Header */}
                  <div className="glass-card p-10 bg-gradient-to-br from-primary/10 to-transparent border-none overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
                       <Target size={200} />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-2">Athlete Report: {analysisResult.name}</p>
                        <h2 className="text-8xl font-black italic tracking-tighter leading-none mb-2">{analysisResult.bmi}</h2>
                        <div className={`text-2xl font-black uppercase italic ${analysisResult.color}`}>{analysisResult.status} Index</div>
                      </div>
                      <div className="max-w-xs text-right hidden md:block">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
                          Your Body Mass Index indicates a {analysisResult.status.toLowerCase()} physiological state relative to elite athletic standards.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Recommendations */}
                  <div className="space-y-12">
                    {recommendationPacks.map((section, idx) => (
                      <div key={idx} className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                          <div className="flex items-center space-x-4">
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter">{section.type}</h3>
                            {section.recommended && (
                              <span className="bg-primary text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                                Recommended Path
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{section.description}</p>

                        <div className="grid md:grid-cols-2 gap-6">
                          {section.packs.map((pack, pIdx) => (
                            <motion.div
                              key={pIdx}
                              whileHover={{ y: -5 }}
                              className="glass-card p-8 border-white/5 hover:border-primary/30 transition-all flex flex-col"
                            >
                              <div className="flex justify-between items-start mb-6">
                                <h4 className="text-xl font-black uppercase italic text-white leading-tight">{pack.title}</h4>
                                <CheckCircle2 size={20} className="text-primary" />
                              </div>

                              <div className="space-y-5 flex-1">
                                <div className="space-y-1">
                                  <p className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center">
                                    <Utensils size={10} className="mr-2" /> Diet Protocol
                                  </p>
                                  <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{pack.diet}</p>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center">
                                    <Dumbbell size={10} className="mr-2" /> Training Matrix
                                  </p>
                                  <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{pack.exercise}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                  <div>
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1 flex items-center">
                                      <Zap size={10} className="mr-1.5" /> Protein
                                    </p>
                                    <p className="text-xs font-black italic">{pack.protein}</p>
                                  </div>
                                  <div>
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1 flex items-center">
                                      <Droplets size={10} className="mr-1.5" /> Water
                                    </p>
                                    <p className="text-xs font-black italic">{pack.water}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1 flex items-center">
                                  <Info size={10} className="mr-1.5 text-primary" /> Crucial Intel
                                </p>
                                <p className="text-[10px] text-gray-400 italic leading-relaxed">{pack.details}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 flex items-start space-x-6">
                    <AlertCircle className="text-primary shrink-0" size={24} />
                    <div>
                      <h4 className="text-sm font-black uppercase italic mb-1">Athlete Disclaimer</h4>
                      <p className="text-xs font-medium text-gray-500 leading-relaxed uppercase tracking-wider">
                        These protocols are generated based on mathematical BMI standards. For Olympic-level performance or underlying medical conditions, please consult the PaceForge medical board or your personal physician.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDetails;
