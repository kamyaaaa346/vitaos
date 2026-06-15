import React, { useState } from "react";
import { Shield, Sparkles, Droplets, Zap, Activity, Brain, Moon, Battery, ThumbsUp } from "lucide-react";

interface DigitalTwinProps {
  initialScore?: number;
}

export default function DigitalTwin({ initialScore = 85 }: DigitalTwinProps) {
  const [wellnessScore, setWellnessScore] = useState(initialScore);
  const [hydration, setHydration] = useState(78);
  const [energy, setEnergy] = useState(82);
  const [recovery, setRecovery] = useState(88);
  const [stress, setStress] = useState(34);
  const [sleepScore, setSleepScore] = useState(91);

  // Active highlighted system
  const [activeSystem, setActiveSystem] = useState<"nervous" | "cardio" | "metabolic" | "cellular">("nervous");

  const getSystemColor = () => {
    if (wellnessScore > 85) return "stroke-emerald-400 text-emerald-400 shadow-emerald-500/50";
    if (wellnessScore > 65) return "stroke-cyan-400 text-cyan-400 shadow-cyan-500/50";
    return "stroke-amber-400 text-amber-400 shadow-amber-500/50";
  };

  const getPulsingSpeed = () => {
    if (stress > 70) return "animate-[pulse_0.8s_infinite]";
    if (energy > 80) return "animate-[pulse_1.5s_infinite]";
    return "animate-[pulse_3s_infinite]";
  };

  // Systems descriptions
  const systemData = {
    nervous: {
      title: "Autonomic Nervous System",
      status: stress > 60 ? "Sympathetic Hegemony (Fight/Flight)" : "Parasympathetic Coherence (Rest/Heal)",
      hrv: Math.round((70 - stress) * 1.8 + 40) + " ms",
      description: "Prone to cognitive exhaust. Magnesium glycinate and box-breathing triggers rapid parasympathetic shift.",
      markers: ["Serotonin output: 84%", "Cortisol index: " + (stress > 50 ? "High" : "Optimal"), "HRV Stability: " + (60 - stress / 2) + "%"]
    },
    cardio: {
      title: "Cardiovascular Telemetry",
      status: "Vo2 Max optimal projection: 54.8",
      hrv: "Resting Heart Rate: " + Math.round(52 + stress / 5) + " Bpm",
      description: "Phospholipid bilayers operate at 94% fluidity index. Mitigate ApoB via increased soluble oat/pea fibers.",
      markers: ["Systolic Baseline: 114 mmHg", "Arterial flexibility: Premium", "Vessel elasticity: 92%"]
    },
    metabolic: {
      title: "Metabolic Pathway & Glucose",
      status: hydration < 50 ? "Insulin sensitivity degraded" : "Optimal Glycemic Clearance",
      hrv: "Gastrointestinal microbiome index: 9.2",
      description: "Carbohydrate clearing is peaking. Postprandial insulin surges normalized. Keep morning fast intervals active.",
      markers: ["Glucose clearance: 110 mg/dL/m", "Insulin reserve: Boundless", "Metabolic age: 24.5"]
    },
    cellular: {
      title: "Nuclear Integrity & Longevity",
      status: "Telomere degradation deceleration: Active",
      hrv: "Sirtuin protein enzyme activation: 91%",
      description: "Autophagy active. High NAD+ cell concentration reported. Soluble antioxidant intake shields cellular nuclei.",
      markers: ["DNA replication stability: 98.8%", "Free radicals neutralized: 92%", "Mitochondrial count: Peak"]
    }
  };

  const currentSystem = systemData[activeSystem];

  return (
    <div className="bg-[#0F1115] border border-white/10 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl group" id="digital-health-twin-section">
      {/* Background neon grids & custom gradients */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-8 items-stretch relative">
        
        {/* Interactive Hologram Simulation */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#050505]/40 rounded-2xl border border-white/5 p-4 min-h-[480px] relative">
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              LIVE TELEMETRY
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 text-white/60 text-xs font-mono border border-white/5">
              HOLOGRAPHE v2.1
            </span>
          </div>

          <div className="absolute top-4 right-4 text-right">
            <div className="text-2xl font-mono text-cyan-400 font-bold">{wellnessScore}%</div>
            <div className="text-[10px] font-mono text-white/40 tracking-wider">AGGREGATE OPTIMAL</div>
          </div>

          {/* Interactive Biological Avatar SVG */}
          <div className="relative w-72 h-96 flex items-center justify-center my-6">
            <div className={`absolute w-44 h-44 rounded-full border border-dashed border-cyan-500/20 animate-[spin_40s_linear_infinite] ${getPulsingSpeed()}`} />
            <div className={`absolute w-56 h-56 rounded-full border border-emerald-500/5 animate-[spin_20s_linear_infinite]`} style={{ borderWidth: "2px" }} />
            <div className="absolute w-2 h-2 bg-purple-500 rounded-full animate-bounce top-10 left-12" />
            <div className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping top-36 right-16" />
            <div className="absolute w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse bottom-20 left-20" />

            {/* Glowing biometric orbs and anatomy overlay */}
            <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 filter drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              {/* Head / Brain glow path */}
              <circle cx="50" cy="18" r="6" className={`fill-none stroke-[1] stroke-cyan-400/40 ${activeSystem === "nervous" ? 'stroke-purple-400' : ''}`} />
              <circle cx="50" cy="18" r="2" className={`fill-cyan-400 ${activeSystem === "nervous" ? 'fill-purple-400' : ''} animate-ping`} />

              {/* Spine neural channel */}
              <line x1="50" y1="24" x2="50" y2="60" className={`stroke-[1] stroke-cyan-500/40`} strokeDasharray="3 2" />

              {/* Cardiovascular Heart Pulsing point */}
              <circle cx="49" cy="30" r="3.5" className={`fill-none stroke-[1] ${activeSystem === "cardio" ? "stroke-emerald-400" : "stroke-purple-500/60"}`} />
              <circle cx="49" cy="30" r="1.5" className={`fill-emerald-400 ${getPulsingSpeed()}`} />

              {/* Left and Right lungs / Rib flow */}
              <path d="M 43 27 Q 35 30 45 42 Q 47 33 43 27 Z" className="fill-none stroke-purple-400/20 stroke-[0.8]" />
              <path d="M 57 27 Q 65 30 55 42 Q 53 33 57 27 Z" className="fill-none stroke-purple-400/20 stroke-[0.8]" />

              {/* Stomach / Liver metabolic pathways */}
              <path d="M 45 44 C 40 48, 48 55, 52 50 C 56 46, 50 40, 45 44 Z" className={`fill-none stroke-[0.8] ${activeSystem === "metabolic" ? 'stroke-cyan-400' : 'stroke-white/10'}`} />
              <circle cx="51" cy="48" r="1" className="fill-cyan-400 animate-pulse" />

              {/* Core Body Silhouette (Prism style lines) */}
              <path d="M 50 12 L 44 24 L 40 38 L 42 50 L 45 68 L 40 90 L 50 92 L 60 90 L 55 68 L 58 50 L 60 38 L 56 24 Z" 
                    className="fill-none stroke-white/[0.08]" strokeWidth="0.5" />

              {/* Bio-electrical mesh lines */}
              <path d="M 40 24 Q 50 18 60 24 M 42 38 Q 50 32 58 38 M 45 68 Q 50 64 55 68 M 40 90 Q 50 88 60 90" 
                    className="fill-none stroke-white/[0.05]" strokeWidth="0.5" />

              {/* Glowing biological aura based on score */}
              <path d="M 50 12 L 44 24 L 40 38 L 42 50 L 45 68 L 40 90 L 50 92 L 60 90 L 55 68 L 58 50 L 60 38 L 56 24 Z" 
                    className={`fill-none stroke-[2.5] ${getSystemColor()} opacity-60`} style={{ strokeDasharray: "4 8" }} />
              
              {/* Cellular digestive channels */}
              {activeSystem === "cellular" && (
                <>
                  <circle cx="43" cy="74" r="2" className="fill-emerald-400 animate-ping" />
                  <circle cx="57" cy="74" r="2" className="fill-emerald-400 animate-ping" />
                  <path d="M 45 68 L 43 78 L 40 90 M 55 68 L 57 78 L 60 90" className="fill-none stroke-emerald-400/40 stroke-[0.8]" strokeDasharray="2 2" />
                </>
              )}
            </svg>

            {/* Float visual labels describing core vectors */}
            <div className="absolute top-[15%] left-[-15%] flex items-center gap-1 bg-[#101216]/90 border border-white/5 py-1 px-2.5 rounded-lg text-[10px] font-mono text-white/80 backdrop-blur-md">
              <Brain className="w-3.5 h-3.5 text-purple-400" />
              <span>Nervous sync</span>
            </div>
            <div className="absolute top-[28%] right-[-15%] flex items-center gap-1 bg-[#101216]/90 border border-white/5 py-1 px-2.5 rounded-lg text-[10px] font-mono text-white/80 backdrop-blur-md">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>HRV {Math.round((70 - stress) * 1.8 + 42)}ms</span>
            </div>
            <div className="absolute bottom-[25%] left-[-20%] flex items-center gap-1 bg-[#101216]/90 border border-white/5 py-1 px-2.5 rounded-lg text-[10px] font-mono text-white/80 backdrop-blur-md">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hydra {hydration}%</span>
            </div>
          </div>

          {/* Target Biome Selector tabs */}
          <div className="flex flex-wrap gap-1 bg-white/[0.03] border border-white/5 p-1 rounded-xl w-full max-w-sm mt-auto z-10">
            <button 
              id="twin-btn-nervous"
              onClick={() => setActiveSystem("nervous")}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-mono font-medium transition-all ${activeSystem === 'nervous' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20 border border-purple-500/30' : 'text-white/40 hover:text-white/80 hover:bg-white/[0.02]'}`}
            >
              NERVOUS
            </button>
            <button 
              id="twin-btn-cardio"
              onClick={() => setActiveSystem("cardio")}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-mono font-medium transition-all ${activeSystem === 'cardio' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 border border-emerald-500/30' : 'text-white/40 hover:text-white/80 hover:bg-white/[0.02]'}`}
            >
              CARDIO
            </button>
            <button 
              id="twin-btn-metabolic"
              onClick={() => setActiveSystem("metabolic")}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-mono font-medium transition-all ${activeSystem === 'metabolic' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20 border border-cyan-500/30' : 'text-white/40 hover:text-white/80 hover:bg-white/[0.02]'}`}
            >
              METABOLIC
            </button>
            <button 
              id="twin-btn-cellular"
              onClick={() => setActiveSystem("cellular")}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-mono font-medium transition-all ${activeSystem === 'cellular' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 border border-indigo-500/30' : 'text-white/40 hover:text-white/80 hover:bg-white/[0.02]'}`}
            >
              CELLULAR
            </button>
          </div>
        </div>

        {/* Dynamic Sliders and System Insights Diagnostics panel */}
        <div className="flex-1 flex flex-col justify-between py-2">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                Cellular Synthesis Dashboard
              </h3>
            </div>

            {/* Quick calibration sliders representing organic telemetry modifications */}
            <div className="bg-[#050505]/30 border border-white/[0.05] p-4 rounded-2xl mb-5 space-y-4">
              <span className="text-[11px] font-mono text-emerald-400 tracking-wider font-semibold block mb-1">REAL-TIME BIOMETRIC INTERACTION ENGINE</span>
              
              <div>
                <div className="flex justify-between text-xs text-white/70 mb-1 font-mono">
                  <span className="flex items-center gap-1"><Brain className="w-3.5 h-3.5 text-purple-400" /> Executive Nerve Coherence</span>
                  <span className="text-purple-400">{100 - stress}%</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="95" 
                  value={100 - stress} 
                  id="stress-modulator"
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setStress(100 - val);
                    setWellnessScore(Math.round((val + hydration + energy + recovery + sleepScore) / 5));
                  }}
                  className="w-full accent-purple-500 cursor-pointer h-1.5 bg-white/5 rounded-lg appearance-none" 
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-white/70 mb-1 font-mono">
                  <span className="flex items-center gap-1"><Droplets className="w-3.5 h-3.5 text-cyan-400" /> Intracellular Hydration</span>
                  <span className="text-cyan-400">{hydration}%</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="100" 
                  value={hydration} 
                  id="hydration-modulator"
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setHydration(val);
                    setWellnessScore(Math.round(((100 - stress) + val + energy + recovery + sleepScore) / 5));
                  }}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-white/5 rounded-lg appearance-none" 
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-white/70 mb-1 font-mono">
                  <span className="flex items-center gap-1"><Moon className="w-3.5 h-3.5 text-indigo-400" /> Circadian Rhythm Deep Sleep</span>
                  <span className="text-indigo-400">{sleepScore}%</span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="100" 
                  value={sleepScore} 
                  id="sleep-modulator"
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setSleepScore(val);
                    setWellnessScore(Math.round(((100 - stress) + hydration + energy + recovery + val) / 5));
                  }}
                  className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-white/5 rounded-lg appearance-none" 
                />
              </div>
            </div>

            {/* Targeted Bio-circuit Diagnostics (Dynamic based on selected bubble) */}
            <div className="bg-gradient-to-br from-[#131720]/80 to-[#191F2D]/80 border border-white/10 rounded-2xl p-5 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest">{currentSystem.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/70 border border-white/5">{currentSystem.hrv}</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-1.5">{currentSystem.status}</h4>
              <p className="text-xs text-white/70 leading-relaxed mb-4">{currentSystem.description}</p>

              <div className="border-t border-white/5 pt-3">
                <span className="text-[10px] font-mono text-white/30 block mb-2 tracking-wider uppercase">Active Biological Markers</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {currentSystem.markers.map((marker, i) => (
                    <div key={i} className="bg-[#050505]/40 border border-white/5 p-2 rounded-xl text-center">
                      <span className="text-[11px] font-mono text-emerald-400 block font-semibold">{marker.split(": ")[1] || marker}</span>
                      <span className="text-[8px] font-mono text-white/40 block mt-0.5 uppercase tracking-wide">{marker.split(": ")[0] || "Marker Status"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4 flex gap-3 items-center">
            <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <span className="text-white font-medium block">Nucleus AI Longevity Projections</span>
              <span className="text-white/60">Given current metrics, your Biological Age projection remains at <strong className="text-emerald-400">{(activeSystem === "metabolic" || wellnessScore > 82) ? "22.4 years" : "25.1 years"}</strong>. Retain structural fasts to maximize cellular autophagy.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
