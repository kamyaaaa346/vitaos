import React, { useState, useEffect, useRef } from "react";
import { 
  Shield, Sparkles, Droplets, Zap, Activity, Brain, Moon, Battery, 
  ArrowRight, Search, Heart, Camera, Upload, Plus, Trash, Check, 
  Settings, TrendingUp, BarChart3, Users, Target, Award, ShoppingBag, 
  DollarSign, CheckCircle2, Menu, X, Lock, RefreshCw, User, Scale, 
  FileText, Dna, Info, Flame, AlertCircle, ShoppingCart, HelpCircle, 
  PlusCircle, BookOpen, Share2 
} from "lucide-react";
import DigitalTwin from "./components/DigitalTwin";
import { UserProfile, Meal, DeviceConnection, BiomarkerInsight, BiomarkerReportResult, GroceryItem, CorporateTeam, ChatMessage, Challenge, Badge } from "./types";

// Constant initial data
const INITIAL_DEVICES: DeviceConnection[] = [
  { id: "oura", name: "Oura Ring Gen 3", type: "ring", status: "connected", battery: 84, primaryMetric: "HRV: 78 ms", lastSync: "1 min ago" },
  { id: "whoop", name: "WHOOP Strap 4.0", type: "watch", status: "connected", battery: 92, primaryMetric: "Recovery: 88%", lastSync: "Sync'd" },
  { id: "apple", name: "Apple Watch Ultra 2", type: "watch", status: "connected", battery: 74, primaryMetric: "Active Cal: 460 kcal", lastSync: "Realtime" },
  { id: "libre", name: "Abbott Freestyle Libre (CGM)", type: "patch", status: "syncing", battery: 100, primaryMetric: "Glucose: 94 mg/dL", lastSync: "5s ago" }
];

const SAMPLE_MEALS: Meal[] = [
  { id: "m1", name: "Wild Sockeye Salmon with Broccoli Sprouts & Avocado", calories: 540, protein: 44, carbs: 12, fat: 34, fiber: 8, healthScore: 97, glycemicImpact: "Low", category: "Lunch" },
  { id: "m2", name: "Grass-Fed Bison Patty over Sprouted Organic Lentils", calories: 620, protein: 48, carbs: 32, fat: 26, fiber: 9, healthScore: 92, glycemicImpact: "Low", category: "Dinner" },
  { id: "m3", name: "Metabolic Awakening Shake (Whey Isolate, MCT, Blueberries)", calories: 340, protein: 32, carbs: 18, fat: 12, fiber: 5, healthScore: 89, glycemicImpact: "Medium", category: "Breakfast" },
  { id: "m4", name: "Organic European Walnuts & Pumpkin Seeds Mixture", calories: 210, protein: 7, carbs: 6, fat: 19, fiber: 4, healthScore: 85, glycemicImpact: "Low", category: "Snack" }
];

const INITIAL_GROCERIES: GroceryItem[] = [
  { name: "Wild Caught Icelandic Cod", category: "Proteins", price: 18.50, selected: true },
  { name: "Organic Broccoli Sprouts (Sulforaphane catalyst)", category: "Micros & Greens", price: 4.20, selected: true },
  { name: "Cold-Pressed Extra Virgin Olive Oil (Aglio)", category: "Healthy Lipids", price: 21.00, selected: true },
  { name: "Raw Unfiltered Pumpkin Seeds", category: "Trace Electrolytes", price: 5.40, selected: true },
  { name: "Sourdough Ancient Spelt Bread", category: "Slow Complex Carbs", substitute: "Germinated High-Protein Ezekiel Bread", price: 6.80, selected: false }
];

const INITIAL_CHALLENGES: Challenge[] = [
  { id: "c1", title: "Autonomic High HRV Sleep Window", rewardPoints: 200, progress: 2, target: 3, unit: "nights above 75ms", category: "sleep", daysLeft: 2 },
  { id: "c2", title: "Metabolic Peak Fasting Target", rewardPoints: 150, progress: 14, target: 16, unit: "Hours continuous fast", category: "nutrition", daysLeft: 1 },
  { id: "c3", title: "Zone 2 Mitochondrial Build", rewardPoints: 300, progress: 95, target: 120, unit: "minutes weekly", category: "fitness", daysLeft: 3 }
];

const INITIAL_BADGES: Badge[] = [
  { id: "b1", title: "Mitochondrial Zealot", description: "Completed 180 mins inside Zone 2 cardio efficiency threshold in a single week cycle.", icon: "Flame", unlocked: true, unlockedAt: "2 days ago" },
  { id: "b2", title: "Autophagy Catalyst", description: "Successfully preserved a clean 16-hour fasting window for 14 consecutive daily rotations.", icon: "Zap", unlocked: true, unlockedAt: "Yesterday" },
  { id: "b3", title: "Epigenetic Sentinel", description: "Uploaded a blood biomarker report and resolved key substandard Vitamin D levels.", icon: "Shield", unlocked: false }
];

const CORPORATE_TEAMS: CorporateTeam[] = [
  { name: "Athero-Defense (Product & Design)", memberCount: 14, teamHealthScore: 89, participationPercentage: 94, activeChallenges: ["10k Zone 2 Aerobic Catalyst", "No refined glucose hours"] },
  { name: "Sirtuin Activators (Engineering Command)", memberCount: 22, teamHealthScore: 84, participationPercentage: 88, activeChallenges: ["Autophagy Sunday Fasting", "Deep Slow Wave sleep tracking"] },
  { name: "Telomere Pioneers (Finance & Operations)", memberCount: 9, teamHealthScore: 78, participationPercentage: 81, activeChallenges: ["Daily Stress Modulation breaks"] }
];

export default function App() {
  // Navigation: "landing" | "app"
  const [activeTab, setActiveTab] = useState<"landing" | "app">("landing");
  
  // App internal navigation panel
  const [appSection, setAppSection] = useState<
    "overview" | "digital-twin" | "nutrition" | "biosync" | "precision-health" | "grocery" | "circles" | "profile"
  >("overview");

  // Core system user data state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 29,
    gender: "Male",
    height: 182,
    weight: 76,
    goals: ["Cardiovascular Defense", "Mitochondrial Longevity", "Cognitive Focus"],
    dietaryPreferences: ["Keto", "High Protein"],
    allergies: ["Gluten", "Hazelnut"],
    activityLevel: "Highly Active (4-5x/week Zone 2)"
  });

  // Notifications simulation
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Continuous Glucose Monitor reports 18% reduction in postprandial glycemic surge from fiber-first sequence.", time: "12m ago", read: false },
    { id: 2, text: "Magnesium levels forecasted deficient if meal intake tracks suboptimal tonight. Consider walnuts.", time: "2h ago", read: false }
  ]);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);

  // States for sub-modules
  const [devices, setDevices] = useState<DeviceConnection[]>(INITIAL_DEVICES);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "wel1", role: "assistant", content: "Welcome to VITAOS Nucleus. Your biometric parameters are successfully mapped. How shall we optimize your cellular metabolism today?", timestamp: "10:31 AM" }
  ]);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // Interactive Meal custom additions
  const [meals, setMeals] = useState<Meal[]>(SAMPLE_MEALS);
  const [selectedMealFilter, setSelectedMealFilter] = useState("All");
  const [customMealInput, setCustomMealInput] = useState("");
  const [isAddingMeal, setIsAddingMeal] = useState(false);

  // Video/Image selector mock for food scanner
  const [uploadedFoodImage, setUploadedFoodImage] = useState<string | null>(null);
  const [scanningStatus, setScanningStatus] = useState<"idle" | "uploading" | "analyzing" | "completed">("idle");
  const [foodScanResult, setFoodScanResult] = useState<any>(null);

  // Biomarkers diagnostics
  const [biomarkerInputText, setBiomarkerInputText] = useState("");
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const [diagnosticReportResult, setDiagnosticReportResult] = useState<BiomarkerReportResult | null>(null);

  // Grocery State
  const [groceries, setGroceries] = useState<GroceryItem[]>(INITIAL_GROCERIES);
  const [groceryPartner, setGroceryPartner] = useState<"zepto" | "blinkit" | "bigbasket" | "instacart">("zepto");
  const [oneClickSuccess, setOneClickSuccess] = useState(false);

  // Gamification achievements & score modifier
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [streakDays, setStreakDays] = useState(14);
  const [vitalityPoints, setVitalityPoints] = useState(2450);

  // Applet Onboarding Form State
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingForm, setOnboardingForm] = useState<UserProfile>({
    age: 32,
    gender: "Female",
    height: 168,
    weight: 61,
    goals: ["Mitochondrial Longevity", "Stress Resilience"],
    dietaryPreferences: ["Mediterranean"],
    allergies: ["Peanuts"],
    activityLevel: "Moderately Active"
  });

  // Quick state manipulation
  const toggleSelectGrocery = (index: number) => {
    const next = [...groceries];
    next[index].selected = !next[index].selected;
    setGroceries(next);
  };

  const addIndividualGrocery = (name: string, category: string, price: number) => {
    setGroceries([...groceries, { name, category, price, selected: true }]);
  };

  // Perform a full instant API checkout trigger
  const triggerOneClickCheckout = () => {
    setOneClickSuccess(true);
    setTimeout(() => {
      setOneClickSuccess(false);
    }, 4000);
  };

  // Handle direct message submission to Node Express API
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentPrompt.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: currentPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setCurrentPrompt("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg].map(m => ({ role: m.role, content: m.content })),
          userProfile
        })
      });
      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.content || "Connection lost to VITAOS Nucleus. Processing secure recovery index.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error("Failed to connect to the central intelligence engine:", err);
    } finally {
      setChatLoading(false);
    }
  };

  // Scan Predefined Mock Foods for Quick Presentation
  const handlePredefinedFoodScan = async (foodKey: "salmon" | "avocado" | "acai") => {
    setScanningStatus("uploading");
    setFoodScanResult(null);

    // Dynamic base64 simulator representation
    const base64Mocks = {
      salmon: "data:image/salmon_poke_bowl_biometrics",
      avocado: "data:image/sourdough_tartine_telemetry",
      acai: "data:image/organic_acai_berry_antioxidants"
    };

    setUploadedFoodImage(foodKey);
    setTimeout(async () => {
      setScanningStatus("analyzing");
      try {
        const response = await fetch("/api/scan-food", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            imageBase64: base64Mocks[foodKey],
            userProfile
          })
        });
        const data = await response.json();
        setFoodScanResult(data);
        setScanningStatus("completed");
        
        // Add to active groceries recommendations
        if (data.alternatives && data.alternatives.length > 0) {
          addIndividualGrocery(`Substitute: ${data.alternatives[0]}`, "Micros & Greens", 6.80);
        }
      } catch (err) {
        console.error(err);
        setScanningStatus("idle");
      }
    }, 1200);
  };

  // Lab Report Blood Diagnostics Analysis API invocation
  const handleBloodReportAnalysisSubmit = async (customReportText?: string) => {
    const activeText = customReportText || biomarkerInputText;
    if (!activeText.trim()) return;

    setIsDiagnosticRunning(true);
    setDiagnosticReportResult(null);

    try {
      const response = await fetch("/api/analyze-biomarkers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportText: activeText,
          fileType: "Hematopoietic Longevity Index",
          userProfile
        })
      });
      const data = await response.json();
      setDiagnosticReportResult(data);

      // Mutate Vitality state to demonstrate real-time gamified incentive
      setVitalityPoints(prev => prev + 350);
      setStreakDays(prev => prev + 1);
      
      // Unlock Badge
      const updatedBadges = badges.map(b => b.id === "b3" ? { ...b, unlocked: true, unlockedAt: "Just Now" } : b);
      setBadges(updatedBadges);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDiagnosticRunning(false);
    }
  };

  // Auto submit specific predefined sample lab report
  const handleAutoSubmitSampleReport = (type: "metabolic" | "lipid" | "longevity") => {
    let mockSnippet = "";
    if (type === "lipid") {
      mockSnippet = "Laboratory Diagnostics: Blood draw 2026-06-12.\nCholesterol Total: 240 mg/dL (Elevated)\nLDL: 154 mg/dL\nHDL: 48 mg/dL\nApoB Index: 118 mg/dL\nHigh-sensitivity C-Reactive Protein (hs-CRP): 3.2 mg/L";
    } else if (type === "metabolic") {
      mockSnippet = "Biometric Lab: Glucose fasting: 114 mg/dL\nHbA1c: 5.8%\nFasting Serum Insulin: 14.5 uIU/mL\nTriglycerides: 165 mg/dL";
    } else {
      mockSnippet = "Bio-report: 25-hydroxy Vitamin D: 22 ng/m (Deficient)\nOmega-3 Index: 4.1% (Low)\nHormone panel: Free Testosterone: 9.4 pg/mL\nTSH Thyroid: 3.4 uIU/mL";
    }
    setBiomarkerInputText(mockSnippet);
    handleBloodReportAnalysisSubmit(mockSnippet);
  };

  // Onboarding Apply Form logic
  const handleApplyOnboarding = () => {
    setUserProfile(onboardingForm);
    setShowOnboarding(false);
    // Alert user
    const onboardedAlert = {
      id: Date.now(),
      text: `VITAOS initialized for a ${onboardingForm.age} y/o health pioneer seeking ${onboardingForm.goals.join(' & ')}. Custom biomarkers calibrated.`,
      time: "Just now",
      read: false
    };
    setNotifications([onboardedAlert, ...notifications]);
  };

  // Auto clean up read notices
  const markNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#ECEFF4] relative overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-200 selection:border">
      {/* Absolute high-end graphic lighting backdrops */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-emerald-500/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-transparent blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-[#131922] to-transparent blur-[120px] pointer-events-none" />

      {/* Global Luxury Header Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#050505]/80 border-b border-white/10 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("landing")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-purple-600 p-[1.5px]">
              <div className="w-full h-full rounded-[10.5px] bg-[#050505] flex items-center justify-center">
                <Dna className="w-5.5 h-5.5 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 font-mono-extended">VITAOS</span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-emerald-400 block -mt-1 font-bold">PREDICTIVE HEALTH OS</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <button 
              onClick={() => setActiveTab("landing")}
              className={`hover:text-emerald-400 font-mono tracking-widest text-xs transition-all ${activeTab === "landing" ? "text-emerald-400 font-bold" : ""}`}
            >
              01 // HOME PORTAL
            </button>
            <button 
              onClick={() => { setActiveTab("app"); setAppSection("overview"); }}
              className={`hover:text-emerald-400 font-mono tracking-widest text-xs transition-all ${activeTab === "app" ? "text-emerald-400 font-bold" : ""}`}
            >
              02 // SYSTEMS CONSOLE
            </button>
            <a href="#digital-health-twin-section" onClick={() => { setActiveTab("app"); setAppSection("overview"); }} className="hover:text-cyan-400 font-mono tracking-widest text-xs transition-colors">
              03 // RECEPTOR GEN
            </a>
            <a href="#biomarker-precision-anchor" onClick={() => { setActiveTab("app"); setAppSection("precision-health"); }} className="hover:text-purple-400 font-mono tracking-widest text-xs transition-colors">
              04 // BIOSYNC BIOMARKERS
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Notifications alert */}
            <div className="relative">
              <button 
                id="bell-notification-btn"
                onClick={() => { setShowNotificationCenter(!showNotificationCenter); markNotificationsRead(); }}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 transition-all relative"
              >
                <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
              </button>

              {showNotificationCenter && (
                <div className="absolute right-0 mt-3 w-80 bg-[#0F1115] border border-white/15 rounded-2xl p-4 shadow-2xl z-50 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
                    <span className="text-xs font-mono font-bold text-emerald-400">NUCLEUS CRITICAL NOTIFICATIONS RECEPTOR</span>
                    <button onClick={() => setShowNotificationCenter(false)} className="text-white/40 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {notifications.map(n => (
                      <div key={n.id} className="text-xs leading-relaxed border-b border-white/[0.03] pb-2 last:border-0">
                        <p className="text-white/80 font-medium">{n.text}</p>
                        <span className="text-[10px] font-mono text-white/40 block mt-1">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Premium CTA launcher switches */}
            {activeTab === "landing" ? (
              <button 
                id="header-launch-btn"
                onClick={() => { setActiveTab("app"); setAppSection("overview"); }}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-[#050505] font-bold text-xs tracking-wider uppercase font-mono-extended shadow-lg shadow-emerald-500/25 border border-emerald-400/40 hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5"
              >
                Launch App Console
                <ArrowRight className="w-3.5 h-3.5 stroke-[3px]" />
              </button>
            ) : (
              <button 
                id="header-landing-btn"
                onClick={() => setActiveTab("landing")}
                className="px-5 py-2 rounded-full bg-white/5 text-white/90 font-bold text-xs tracking-wider uppercase font-mono border border-white/10 hover:bg-white/10 transition-all"
              >
                Portal Site
              </button>
            )}
          </div>
        </div>
      </header>

      {/* --------------------- SECTION 1: MASTER LANDING PAGE --------------------- */}
      {activeTab === "landing" && (
        <main className="pb-24">
          
          {/* HERO CAMPAIGN SECTION */}
          <section className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-purple-600/15 border border-emerald-400/20 text-emerald-300 text-xs font-mono font-medium tracking-wide mb-6">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              THE WORLD'S FIRST PREDICTIVE HEALTH OPERATING SYSTEM
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
              Your Body. <br className="hidden md:block"/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400">
                Connected. Predicted. Optimized.
              </span>
            </h1>

            <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-10">
              VITAOS combines continuous bio-telemetry, deep blood biomarker genomics, food scanners, and instant custom grocery automation into one beautiful Apple-class AI ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button 
                id="landing-hero-primary-cta"
                onClick={() => { setActiveTab("app"); setShowOnboarding(true); }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500 text-black font-extrabold text-sm tracking-wider uppercase shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
              >
                Start Health Analysis
                <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
              </button>
              
              <button 
                id="landing-watch-demo-btn"
                onClick={() => { setActiveTab("app"); setAppSection("overview"); }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#151922] text-white font-bold text-sm tracking-widest uppercase border border-white/10 hover:bg-white/5 transition-all text-center"
              >
                Watch 2030 Demo Video
              </button>
            </div>

            {/* TRUSTED / INTENDED DEVICE BADGES */}
            <div className="pt-8 border-t border-white/[0.06] max-w-5xl mx-auto">
              <p className="text-xs font-mono tracking-[0.25em] text-white/30 uppercase mb-6">INTEGRATING CONSUMER BIOTECH ON ONE RECEPTOR SYSTEM</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-sm font-extrabold text-white font-mono">⌚ APPLE WATCH ULTRA</span>
                <span className="text-sm font-extrabold text-white font-mono">⭕ OURA RING G3</span>
                <span className="text-sm font-extrabold text-white font-mono">⚡ WHOOP BIO-LINK</span>
                <span className="text-sm font-extrabold text-white font-mono">📈 DEXCOM CGM G7</span>
                <span className="text-sm font-extrabold text-white font-mono">⚖️ WITHERINGS SCALE</span>
              </div>
            </div>
          </section>

          {/* DYNAMIC DIGITAL BIO-TWIN GLOSSY PREVIEW SHOWCASE */}
          <section className="max-w-6xl mx-auto px-4 mt-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="text-center mb-10">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">DIGITAL HEALTH TWIN PREVIEW</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1">Simulate Biometric Modulations Live</h2>
            </div>
            
            {/* RENDER THE INTERACTIVE DIGITAL TWIN IN DECORATED LIGHTS */}
            <div className="p-1 rounded-3xl bg-gradient-to-tr from-white/10 via-emerald-400/20 to-purple-500/20 shadow-2xl">
              <DigitalTwin initialScore={88} />
            </div>
          </section>

          {/* AMAZING SAVVY FEATURES GRID (FLUID LUXURY GLASSMORPH CARDS) */}
          <section className="max-w-7xl mx-auto px-4 mt-32 relative z-10" id="features">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-[0.3em] font-bold block mb-2">01 // PREMIUM UTILITIES ENGINES</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">Advanced Molecular Health Stack</h2>
              <p className="text-sm md:text-base text-white/50 mt-4 leading-relaxed">VITAOS bypasses simple sleep logs, connecting your life vectors, biomarkers, and automated grocery runs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-[#151922]/50 border border-white/10 rounded-2xl p-6 relative group overflow-hidden hover:border-emerald-400/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl" />
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 font-bold text-lg group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">BioSync Bio-Wearables Link</h3>
                <p className="text-xs text-white/60 leading-relaxed">Auto-harmonizes live sleep, active glucose curves, heart rate anomalies, and somatic stress from standard fitness and CGM devices.</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#151922]/50 border border-white/10 rounded-2xl p-6 relative group overflow-hidden hover:border-cyan-400/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl" />
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 font-bold text-lg group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI Food Scanning engine</h3>
                <p className="text-xs text-white/60 leading-relaxed">Provides computer-vision portion and glycemic impact analysis. Identifies exact nutritional densities instantly with a simple snap.</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#151922]/50 border border-white/10 rounded-2xl p-6 relative group overflow-hidden hover:border-purple-400/30 transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl" />
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 font-bold text-lg group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Precision Lipid Biomarkers</h3>
                <p className="text-xs text-white/60 leading-relaxed">Resolves high ApoB ApoA1 cholesterol indexes, Vitamin D, inflammatory hs-CRP, recommending optimized whole-food substitutions.</p>
              </div>
            </div>
          </section>

          {/* GROCERY INTEGRATION PROPS SECTION */}
          <section className="max-w-7xl mx-auto px-4 mt-32">
            <div className="bg-gradient-to-br from-[#0F1115] via-[#151922] to-[#0A0C10] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-[10px] font-mono text-purple-400 tracking-[0.3em] uppercase block mb-2">NUTRITIONAL AUTOMATION STATE</span>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">Autonomous Grocery Checkout</h2>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed mb-6">
                    Nucleus AI calculates daily micronutrient shortages and writes high-performance food items directly to online checkout queues in Zepto, Instacart, BigBasket or Blinkit with one click.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-xs text-white/80">Replaces simple recipes with real ingredient dispatch</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-xs text-white/80">Suggests organic healthy substitutes for inflammatory goods</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="text-xs text-white/80">Locks down grocery spend budgets automatically</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setActiveTab("app"); setAppSection("grocery"); }}
                    className="px-6 py-3 rounded-full bg-white text-black font-extrabold text-xs tracking-widest uppercase hover:bg-slate-100 transition-all"
                  >
                    TEST GROCERY ROUTING ENGINE
                  </button>
                </div>

                <div className="bg-[#050505]/60 border border-white/10 rounded-2xl p-6 relative">
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">VITA DEPT CART OVERVIEW</span>
                    <span className="text-[10px] font-mono text-white/40">CONNECTED TO ZEPTO API</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-xs p-2 rounded bg-white/2">
                      <span className="text-white/80">🥦 Broccoli Sprouts (Sulforaphane catalyst)</span>
                      <span className="text-emerald-400 font-mono font-bold">$4.20</span>
                    </div>
                    <div className="flex justify-between text-xs p-2 rounded bg-white/2">
                      <span className="text-white/80">🥑 Organic Hass Avocados (Monounsaturated)</span>
                      <span className="text-emerald-400 font-mono font-bold">$6.80</span>
                    </div>
                    <div className="flex justify-between text-xs p-2 rounded bg-white/2">
                      <span className="text-white/80">🥩 Grass-fed pasture ribeye steaks (High Iron)</span>
                      <span className="text-emerald-400 font-mono font-bold">$22.40</span>
                    </div>
                    <div className="flex justify-between text-xs p-2 rounded bg-red-400/5 border border-red-500/20">
                      <span className="text-red-400">🍞 Sourdough Wheat</span>
                      <span className="text-white/40 font-mono line-through">$5.20</span>
                    </div>
                    <div className="flex justify-between text-xs p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-emerald-400">🍞 Substitute: Ezekiel High-Protein</span>
                      <span className="text-emerald-400 font-mono font-bold">+$1.60</span>
                    </div>
                  </div>

                  <button 
                    onClick={triggerOneClickCheckout}
                    className="w-full py-3 rounded-xl bg-emerald-500 text-black font-extrabold text-xs tracking-widest uppercase hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {oneClickSuccess ? "TRANSACTION DISPATCHED!" : "ONE-CLICK CONSOLE INTEGRATION"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* CORPORATE WELLNESS CHALLENGE PROPS */}
          <section className="max-w-7xl mx-auto px-4 mt-32">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block mb-2 font-bold">CIRCLES & B2B WELLNESS</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">VITAOS Circles for Enterprise</h2>
              <p className="text-sm text-white/50 leading-relaxed mt-2">Create corporate wellness boards with real composite physical telemetry. Gamified challenges lower corporate health-plan liabilities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0F1115] border border-white/5 p-6 rounded-2xl relative text-center">
                <span className="text-3xl font-mono-extended font-extrabold text-emerald-400 block mb-2">32%</span>
                <span className="text-sm font-semibold text-white block mb-1">Liability reduction</span>
                <p className="text-xs text-white/50 leading-relaxed">Our enterprise clients map average clinical risk reduction on corporate healthcare spend within four weeks.</p>
              </div>

              <div className="bg-[#0F1115] border border-white/5 p-6 rounded-2xl relative text-center">
                <span className="text-3xl font-mono-extended font-extrabold text-cyan-400 block mb-2">91%</span>
                <span className="text-sm font-semibold text-white block mb-1">Employee Participation</span>
                <p className="text-xs text-white/50 leading-relaxed">Interactive daily hydration rewards, Zone 2 challenges, and badges trigger heavy corporate team bonding.</p>
              </div>

              <div className="bg-[#0F1115] border border-white/5 p-6 rounded-2xl relative text-center">
                <span className="text-3xl font-mono-extended font-extrabold text-purple-400 block mb-2">94/100</span>
                <span className="text-sm font-semibold text-white block mb-1">VITAOS Coherence Score</span>
                <p className="text-xs text-white/50 leading-relaxed">Anonymous aggregated employee metrics are fully compliant with SOC2 and HIPAA standards.</p>
              </div>
            </div>
          </section>

          {/* USER TESTIMONIALS */}
          <section className="max-w-7xl mx-auto px-4 mt-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Loved by High Performers</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#151922]/30 border border-white/5 p-6 rounded-2xl relative">
                <p className="text-sm text-white/80 leading-relaxed mb-6 italic">"VITAOS is the Apple Vision Pro of health. I connected my WHOOP and blood report in 2 seconds. The physical twin avatar predicted my fatigue peak before my flight."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-emerald-400 font-mono">MS</div>
                  <div>
                    <span className="text-xs font-bold text-white block">Dr. Marc Sirtuin</span>
                    <span className="text-[10px] text-white/40 block">Longevity Bio-Medicine Researcher</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#151922]/30 border border-white/5 p-6 rounded-2xl relative">
                <p className="text-sm text-white/80 leading-relaxed mb-6 italic">"The automated checkout substitution is pure genius. Replacing regular white bread orders with sprouted high fiber Ezekiel alternatives cured my circadian brain fog."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-cyan-400 font-mono">KV</div>
                  <div>
                    <span className="text-xs font-bold text-white block">Kieran Vance</span>
                    <span className="text-[10px] text-white/40 block">Series B Tech Founder</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#151922]/30 border border-white/5 p-6 rounded-2xl relative">
                <p className="text-sm text-white/80 leading-relaxed mb-6 italic">"Our engineering department has seen a huge organic uptick in Zone 2 cardio attendance due to VITAOS corporate circles. Best investment in team focus."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-purple-400 font-mono">AT</div>
                  <div>
                    <span className="text-xs font-bold text-white block">Aria Templeton</span>
                    <span className="text-[10px] text-white/40 block">Director of People Operations</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DELIBERATE PRICING TABLE (Apple Vision Style glassmorphism) */}
          <section className="max-w-4xl mx-auto px-4 mt-32">
            <div className="text-center mb-16">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">CHOOSE YOUR PERFORMANCE TRACK</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Epigenetic Plans for Life</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div className="bg-[#0F1115]/80 border border-white/5 p-8 rounded-3xl flex flex-col justify-between relative">
                <div>
                  <h3 className="text-xl font-bold text-white">VITA Essential</h3>
                  <p className="text-xs text-white/40 font-mono mt-1">FOR CASUAL BIO-HACKERS</p>
                  <div className="my-6">
                    <span className="text-4xl font-black text-white">$29</span>
                    <span className="text-xs text-white/40"> / month</span>
                  </div>
                  <ul className="space-y-3.5 text-xs text-white/70 mb-8">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Basic Oura / WHOOP Linkage</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> AI Food Photo Scanner limits (10/mo)</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Standby Digital Twin simulations</li>
                  </ul>
                </div>
                <button 
                  onClick={() => { setActiveTab("app"); setAppSection("overview"); }}
                  className="w-full py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs tracking-wider uppercase hover:bg-white/10 transition-all text-center"
                >
                  Configure baseline
                </button>
              </div>

              <div className="bg-[#151922] border border-emerald-500/30 p-8 rounded-3xl flex flex-col justify-between relative shadow-xl shadow-emerald-500/10">
                <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">RECOMMENDED</div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-1.5Packed">
                    VITA Pro Cellular
                  </h3>
                  <p className="text-xs text-emerald-400/40 font-mono mt-1">FOR LONGEVITY PIONEERS</p>
                  <div className="my-6">
                    <span className="text-4xl font-black text-white">$89</span>
                    <span className="text-xs text-white/40"> / month</span>
                  </div>
                  <ul className="space-y-3.5 text-xs text-white/80 mb-8">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Continuous Realtime BioSync (unlimited)</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> AI DNA & blood lab reports processing</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Zepto / Instacart One-Click autonomous buy</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Luxury Interactive Medical Twin (4 vectors)</li>
                  </ul>
                </div>
                <button 
                  onClick={() => { setActiveTab("app"); setShowOnboarding(true); }}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-extrabold text-xs tracking-wider uppercase shadow-md shadow-emerald-500/20 hover:opacity-90 active:scale-95 transition-all text-center"
                >
                  START ANALYSIS
                </button>
              </div>
            </div>
          </section>

          {/* FINAL CTA BOX */}
          <section className="max-w-5xl mx-auto px-4 mt-32 text-center relative">
            <div className="bg-gradient-to-tr from-[#131d17]/50 via-[#151922] to-purple-950/20 border border-white/10 rounded-3xl p-12 relative overflow-hidden">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">Unlock Your High Performance Longevity Today</h2>
              <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto leading-relaxed mb-8">
                Your body is transmitting billions of real-time signals. Tap into the VITAOS central coordinate engine and protect your health span.
              </p>
              <button 
                id="cta-bottom"
                onClick={() => { setActiveTab("app"); setAppSection("overview"); }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-extrabold text-xs tracking-widest uppercase hover:scale-105 transition-all"
              >
                Launch Systems Panel
              </button>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="mt-32 border-t border-white/5 py-12 text-center text-xs text-white/30 font-mono">
            <p className="tracking-widest uppercase">&copy; 2026 VITA COHERENT TECHNOLOGIES INC. HIPAA SECURED SYSTEM.</p>
            <p className="mt-2 text-[10px]">VITAOS, the VITA logo, and Receptor AI are registered engineering marks of Antigravity AI Group. Peter Attia Clinical Principles compliant.</p>
          </footer>
        </main>
      )}

      {/* --------------------- SECTION 2: HEALTH OS INTERACTIVE CONSOLE --------------------- */}
      {activeTab === "app" && (
        <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
          
          {/* USER BIO SUMMARY PANEL */}
          <div className="bg-gradient-to-r from-[#0F1115] via-[#151922] to-[#121620] border border-white/10 rounded-3xl p-6 mb-8 flex flex-col md:flex-row gap-6 items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center font-bold text-sm text-emerald-400 border border-white/10 uppercase relative">
                {userProfile.gender[0]}
                <span className="absolute bottom-0 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border border-[#050505] flex items-center justify-center text-[8px] font-bold text-black animate-pulse">✓</span>
              </div>
              
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-white">Baseline Map: User ID #999153527</h2>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-mono border border-emerald-500/20 uppercase font-semibold">Active Profile</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-white/50 mt-1 justify-center md:justify-start">
                  <span>{userProfile.age} Years Old</span>
                  <span>•</span>
                  <span>{userProfile.height} cm</span>
                  <span>•</span>
                  <span>{userProfile.weight} kg</span>
                  <span>•</span>
                  <span className="text-cyan-400 font-medium font-mono">{userProfile.activityLevel}</span>
                </div>
              </div>
            </div>

            {/* Quick Goals badges and edit trigger */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="flex flex-wrap gap-1.5 justify-center md:justify-end">
                {userProfile.goals.map((goal, idx) => (
                  <span key={idx} className="px-2 py-0.75 text-[10px] font-mono rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium">
                    {goal}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  id="open-onboarding-wizard-btn"
                  onClick={() => setShowOnboarding(true)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Calibrate Physical Metadata
                </button>
              </div>
            </div>
          </div>

          {/* SECONDARY SIDEBAR/VIEW SWITCHER */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* LEFT SYSTEM INDEX NAV WHEEL */}
            <div className="space-y-2 lg:col-span-1">
              <div className="bg-[#0F1115] border border-white/5 p-4 rounded-2xl mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-white/40 tracking-wider">CRITICAL SCOREBOARD</span>
                  <Activity className="w-3.5 h-3.5 text-emerald-400 animate-ping" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-[#050505]/40 p-2.5 rounded-xl border border-white/5">
                    <span className="text-2xl font-mono-extended text-emerald-400 font-extrabold">{vitalityPoints}</span>
                    <span className="text-[8px] font-mono text-white/30 block mt-0.5 uppercase tracking-wider">VITA Coins</span>
                  </div>
                  <div className="bg-[#050505]/40 p-2.5 rounded-xl border border-white/5">
                    <span className="text-2xl font-mono-extended text-cyan-400 font-extrabold">{streakDays}d</span>
                    <span className="text-[8px] font-mono text-white/30 block mt-0.5 uppercase tracking-wider">Streak</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1 bg-[#0F1115]/80 border border-white/10 rounded-2xl p-2 sticky top-24">
                <button 
                  id="nav-btn-overview"
                  onClick={() => setAppSection("overview")}
                  className={`w-full py-3 px-4 rounded-xl text-left text-xs font-mono tracking-wider transition-all flex items-center justify-between ${appSection === "overview" ? "bg-gradient-to-r from-emerald-500/10 to-cyan-500/15 text-emerald-400 border border-emerald-500/20 font-bold" : "text-white/60 hover:text-white hover:bg-white/[0.02]"}`}
                >
                  <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> 01 // OVERVIEW CONSOLE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </button>
                <button 
                  id="nav-btn-digital-twin"
                  onClick={() => setAppSection("digital-twin")}
                  className={`w-full py-3 px-4 rounded-xl text-left text-xs font-mono tracking-wider transition-all flex items-center justify-between ${appSection === "digital-twin" ? "bg-gradient-to-r from-emerald-500/10 to-indigo-500/15 text-indigo-400 border border-indigo-500/20 font-bold" : "text-white/60 hover:text-white hover:bg-white/[0.02]"}`}
                >
                  <span className="flex items-center gap-2"><Brain className="w-4 h-4" /> 02 // DYNAMIC BIO-TWIN</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                </button>
                <button 
                  id="nav-btn-nutrition"
                  onClick={() => setAppSection("nutrition")}
                  className={`w-full py-3 px-4 rounded-xl text-left text-xs font-mono tracking-wider transition-all flex items-center justify-between ${appSection === "nutrition" ? "bg-gradient-to-r from-emerald-500/10 to-pink-500/15 text-pink-400 border border-pink-500/20 font-bold" : "text-white/60 hover:text-white hover:bg-white/[0.02]"}`}
                >
                  <span className="flex items-center gap-2"><Flame className="w-4 h-4" /> 03 // NUTRITION ANALYZER</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                </button>
                <button 
                  id="nav-btn-biosync"
                  onClick={() => setAppSection("biosync")}
                  className={`w-full py-3 px-4 rounded-xl text-left text-xs font-mono tracking-wider transition-all flex items-center justify-between ${appSection === "biosync" ? "bg-gradient-to-r from-emerald-500/10 to-cyan-500/15 text-cyan-400 border border-cyan-500/20 font-bold" : "text-white/60 hover:text-white hover:bg-white/[0.02]"}`}
                >
                  <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> 04 // CONNECTED RECEPTORS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </button>
                <button 
                  id="nav-btn-precision-health"
                  onClick={() => setAppSection("precision-health")}
                  className={`w-full py-3 px-4 rounded-xl text-left text-xs font-mono tracking-wider transition-all flex items-center justify-between ${appSection === "precision-health" ? "bg-gradient-to-r from-emerald-500/10 to-purple-500/15 text-purple-400 border border-purple-500/20 font-bold" : "text-white/60 hover:text-white hover:bg-white/[0.02]"}`}
                >
                  <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> 05 // BIOMARKER DIAGS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                </button>
                <button 
                  id="nav-btn-grocery"
                  onClick={() => setAppSection("grocery")}
                  className={`w-full py-3 px-4 rounded-xl text-left text-xs font-mono tracking-wider transition-all flex items-center justify-between ${appSection === "grocery" ? "bg-gradient-to-r from-emerald-500/10 to-amber-500/15 text-amber-500 border border-amber-500/20 font-bold" : "text-white/60 hover:text-white hover:bg-white/[0.02]"}`}
                >
                  <span className="flex items-center gap-2"><ShoppingBag className="w-4 h-4" /> 06 // INSTANT CHECKOUT</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                </button>
                <button 
                  id="nav-btn-circles"
                  onClick={() => setAppSection("circles")}
                  className={`w-full py-3 px-4 rounded-xl text-left text-xs font-mono tracking-wider transition-all flex items-center justify-between ${appSection === "circles" ? "bg-gradient-to-r from-emerald-500/10 to-blue-500/15 text-blue-400 border border-blue-500/20 font-bold" : "text-white/60 hover:text-white hover:bg-white/[0.02]"}`}
                >
                  <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 07 // COMMUNITY / CHALLENGES</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                </button>
              </div>
            </div>

            {/* MAIN DATA MODULE DISPLAY FRAME */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* SUBSECTION: OVERVIEW CONSOLE */}
              {appSection === "overview" && (
                <div className="space-y-8">
                  {/* METRIC ORBS ROW */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Orb 1: Vitality health score */}
                    <div className="bg-[#151922] border border-white/10 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono text-emerald-400 tracking-wider">HEALTH SCORE</span>
                        <Activity className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="my-3 flex items-baseline gap-1.5">
                        <span className="text-3xl font-mono-extended font-black text-white">94</span>
                        <span className="text-xs text-white/40">/100</span>
                      </div>
                      <div className="text-[11px] text-white/50 leading-relaxed font-mono font-medium">
                        <span className="text-emerald-400">▲ Optimum 4.5y</span> younger than chronological target
                      </div>
                    </div>

                    {/* Orb 2: Heart Rate Variable */}
                    <div className="bg-[#151922] border border-white/10 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono text-cyan-400 tracking-wider">AUTONOMIC HRV</span>
                        <Zap className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div className="my-3 flex items-baseline gap-1.5">
                        <span className="text-3xl font-mono-extended font-black text-white">82</span>
                        <span className="text-xs text-white/40">ms</span>
                      </div>
                      <div className="text-[11px] text-white/50 leading-relaxed font-mono font-medium">
                        <span className="text-cyan-400">▲ Highly coherent</span> nervous index reported
                      </div>
                    </div>

                    {/* Orb 3: Fasting Glucose */}
                    <div className="bg-[#151922] border border-white/10 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono text-purple-400 tracking-wider">GLUCOSE BASE</span>
                        <Droplets className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="my-3 flex items-baseline gap-1.5">
                        <span className="text-3xl font-mono-extended font-black text-white">96</span>
                        <span className="text-xs text-white/40">mg/dL</span>
                      </div>
                      <div className="text-[11px] text-white/50 leading-relaxed font-mono font-medium">
                        <span className="text-purple-400">■ Steady baseline</span> zero postprandial crash
                      </div>
                    </div>

                    {/* Orb 4: Active Fast Circle */}
                    <div className="bg-[#151922] border border-white/10 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono text-amber-400 tracking-wider">FAST INTERVAL</span>
                        <Moon className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="my-3 flex items-baseline gap-1.5">
                        <span className="text-3xl font-mono-extended font-black text-white">15.5</span>
                        <span className="text-xs text-white/40">hours</span>
                      </div>
                      <div className="text-[11px] text-white/50 leading-relaxed font-mono font-medium">
                        <span className="text-amber-400">⌛ Fasting window active</span>. Autophagy trigger online
                      </div>
                    </div>
                  </div>

                  {/* CELLULAR DIGITAL BIO-TWIN SIMULATOR AT HEART OF OVERVIEW */}
                  <div className="bg-[#0F1115] border border-white/10 rounded-3xl overflow-hidden p-1">
                    <DigitalTwin initialScore={94} />
                  </div>

                  {/* AI NUCLEUS PREDICTIVE INSIGHT CARD */}
                  <div className="bg-gradient-to-br from-[#121620] to-[#0A0D14] border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 border border-cyan-500/20">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-cyan-400 tracking-widest font-bold">NUCLEUS AI METABOLIC INTELLIGENCE INSIGHT</span>
                        <h4 className="text-lg font-bold text-white">Continuous Glucose Monitor (CGM) Spike Mitigation Recommended</h4>
                        <p className="text-xs text-white/70 leading-relaxed">
                          "Your previous post-lunch sleep segment showed a severe autonomic stress drop. To keep insulin receptor velocity steady, prioritize 12g of healthy raw lipids (European Walnuts / Avocado fat) prior to complex sourdough carbohydrates. VITAOS prediction model forecasts a <strong className="text-emerald-400">22% stabilization</strong> in postprandial glucose."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBSECTION: DIGITAL HEALTH TWIN CHAT ENGINE */}
              {appSection === "digital-twin" && (
                <div className="space-y-6">
                  <div className="bg-[#0F1115] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-400" />
                        <h3 className="text-lg font-bold text-white">Predictive Health Twin Diagnostics</h3>
                      </div>
                      <span className="text-xs font-mono text-white/40">SECURE SHELL // COGNITIVE LABS</span>
                    </div>

                    {/* Chat log displays */}
                    <div className="space-y-4 max-h-[380px] overflow-y-auto mb-6 p-4 bg-[#050505]/60 rounded-2xl border border-white/5">
                      {chatMessages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex gap-3 max-w-4xl ${msg.role === "user" ? "justify-end ml-auto" : "justify-start mr-auto"}`}
                        >
                          {msg.role !== "user" && (
                            <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xs shrink-0 font-mono">
                              N
                            </div>
                          )}
                          <div className={`p-4 rounded-2xl text-xs leading-relaxed ${msg.role === "user" ? "bg-purple-600 text-white rounded-br-none" : "bg-white/[0.04] text-white/90 rounded-bl-none border border-white/5"}`}>
                            <p>{msg.content}</p>
                            <span className="text-[9px] font-mono block text-right mt-1.5 opacity-40">{msg.timestamp}</span>
                          </div>
                          {msg.role === "user" && (
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-white font-bold text-xs shrink-0 uppercase font-mono">
                              {userProfile.gender[0]}
                            </div>
                          )}
                        </div>
                      ))}

                      {chatLoading && (
                        <div className="flex gap-2 items-center justify-start text-xs text-white/40 font-mono p-2">
                          <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
                          <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                          <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                          <span>Nucleus predicting cellular responses...</span>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input 
                        type="text" 
                        value={currentPrompt}
                        onChange={(e) => setCurrentPrompt(e.target.value)}
                        placeholder="Ask VITAOS AI Coach about your continuous glucose trends, ApoB report, or recovery cycle adjustments..."
                        className="flex-1 bg-[#050505] text-white text-xs border border-white/10 rounded-xl px-4 py-3 placeholder:text-white/30 focus:outline-none focus:border-purple-500/80 transition-all font-mono"
                      />
                      <button 
                        type="submit" 
                        className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs uppercase tracking-wider text-white transition-all font-mono"
                      >
                        Ask Coach
                      </button>
                    </form>

                    {/* Pre-saved quick prompts for easy testing */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <span className="text-[10px] font-mono text-white/30 block mb-2 font-bold tracking-wider uppercase">Calibrated Queries Quick Test</span>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => { setCurrentPrompt("My recovery score dropped 12% this week. Give longevity strategy."); }}
                          className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-white/80 font-mono transition-all"
                        >
                          "Check my Oura ring recovery drop"
                        </button>
                        <button 
                          onClick={() => { setCurrentPrompt("My blood sugar spikes detected after lunch. Calculate fiber sequential sequence."); }}
                          className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-white/80 font-mono transition-all"
                        >
                          "Reduce glucose postprandial spike"
                        </button>
                        <button 
                          onClick={() => { setCurrentPrompt("My ApoB cholesterol blood biomarker reports are high. Create alternative food substitutes."); }}
                          className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-white/80 font-mono transition-all"
                        >
                          "Optimize high ApoB cholesterol indicators"
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBSECTION: NUTRITION & MEAL ANALYSIS */}
              {appSection === "nutrition" && (
                <div className="space-y-8">
                  
                  {/* REALTIME VISUAL FOOD IMAGE SCANNER UNIT */}
                  <div className="bg-[#0F1115] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Camera className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-lg font-bold text-white">AI Vision Molecular Food Scanner</h3>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold">BETA 2.0</span>
                    </div>

                    <p className="text-xs text-white/60 leading-relaxed mb-6">
                      Bypass typing in caloric variables manually. VITAOS Food Vision Estimates portions, micronutrients density, and glycemic baseline shifts directly from simple photos.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      {/* Photo drag/drop input visual */}
                      <div className="border-2 border-dashed border-white/10 hover:border-emerald-400/30 rounded-2xl p-6 text-center bg-[#050505]/40 transition-all flex flex-col items-center justify-center">
                        <Camera className="w-10 h-10 text-white/20 mb-3" />
                        <span className="text-xs font-semibold text-white block mb-1">Upload Photo of Culinary Plate</span>
                        <span className="text-[10px] text-white/40 block mb-6">Drag and drop or select file</span>
                        
                        <div className="w-full space-y-2">
                          <span className="text-[10px] font-mono text-white/20 block uppercase tracking-widest font-bold">OR CHOOSE PRE-STORED PRESENTATION DISHES</span>
                          <div className="grid grid-cols-3 gap-2">
                            <button 
                              onClick={() => handlePredefinedFoodScan("salmon")}
                              className="p-1.5 rounded-xl border border-white/5 bg-[#151922] font-mono text-[9px] hover:border-emerald-400 hover:bg-emerald-500/5 text-white/95"
                            >
                              🐟 Salmon Poke Bowl
                            </button>
                            <button 
                              onClick={() => handlePredefinedFoodScan("avocado")}
                              className="p-1.5 rounded-xl border border-white/5 bg-[#151922] font-mono text-[9px] hover:border-emerald-400 hover:bg-emerald-500/5 text-white/95"
                            >
                              🥑 Avocado Toast
                            </button>
                            <button 
                              onClick={() => handlePredefinedFoodScan("acai")}
                              className="p-1.5 rounded-xl border border-white/5 bg-[#151922] font-mono text-[9px] hover:border-emerald-400 hover:bg-emerald-500/5 text-white/95"
                            >
                              🍓 Acai Berry Bowl
                            </button>
                          </div>
                        </div>

                        {uploadedFoodImage && (
                          <div className="mt-6 flex items-center gap-2 bg-emerald-500/5 px-3 py-1.5 rounded-xl border border-emerald-500/20 text-xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-emerald-400 font-mono font-bold uppercase">{uploadedFoodImage} Dish Selected</span>
                          </div>
                        )}
                      </div>

                      {/* Display scanned results */}
                      <div className="bg-[#050505]/40 border border-white/5 rounded-2xl p-5 min-h-[220px] flex flex-col justify-center">
                        {scanningStatus === "idle" && (
                          <div className="text-center text-white/40 text-xs space-y-1">
                            <Info className="w-7 h-7 mx-auto mb-1 opacity-20" />
                            <p>Await scanner dispatch.</p>
                            <span className="text-[10px]">Select a sample plate on the left to test optical diagnostic speed.</span>
                          </div>
                        )}

                        {scanningStatus === "uploading" && (
                          <div className="text-center text-white/60 font-mono text-xs space-y-2 animate-pulse">
                            <RefreshCw className="w-6 h-6 mx-auto animate-spin text-emerald-400" />
                            <p>UPLOADING IMAGE METRIC PACKS...</p>
                          </div>
                        )}

                        {scanningStatus === "analyzing" && (
                          <div className="text-center text-white/60 font-mono text-xs space-y-2">
                            <Sparkles className="w-6 h-6 mx-auto text-cyan-400 animate-pulse" />
                            <p>DISPATCHING TELEMETRY PIXEL CHECKS...</p>
                            <span className="text-[10px] text-white/40 block">Running deep visual macro-analysis</span>
                          </div>
                        )}

                        {scanningStatus === "completed" && foodScanResult && (
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">DETECTED DISH</span>
                                <h4 className="text-sm font-bold text-white">{foodScanResult.name}</h4>
                              </div>
                              <span className="px-2 py-1 rounded bg-zinc-900 border border-white/10 text-xs font-mono font-extrabold text-white">{foodScanResult.calories} KCAL</span>
                            </div>

                            {/* Macro breakdown columns */}
                            <div className="grid grid-cols-4 gap-1 text-center bg-white/[0.02] p-2 rounded-xl">
                              <div>
                                <span className="text-base text-white font-bold block">{foodScanResult.protein}g</span>
                                <span className="text-[8px] font-mono text-white/40 block uppercase">Protein</span>
                              </div>
                              <div>
                                <span className="text-base text-white font-bold block">{foodScanResult.carbs}g</span>
                                <span className="text-[8px] font-mono text-white/40 block uppercase">Carbs</span>
                              </div>
                              <div>
                                <span className="text-base text-white font-bold block">{foodScanResult.fat}g</span>
                                <span className="text-[8px] font-mono text-white/40 block uppercase">Lipids</span>
                              </div>
                              <div>
                                <span className="text-base text-white font-bold block">{foodScanResult.fiber}g</span>
                                <span className="text-[8px] font-mono text-white/40 block uppercase">Fiber</span>
                              </div>
                            </div>

                            {/* Score info */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-2 border border-white/5 rounded-xl bg-[#050505]/40">
                                <span className="text-[9px] font-mono text-white/40 uppercase block">VITA Health Score</span>
                                <span className="text-base text-emerald-400 font-bold font-mono">{foodScanResult.healthScore} / 100</span>
                              </div>
                              <div className="p-2 border border-white/5 rounded-xl bg-[#050505]/40">
                                <span className="text-[9px] font-mono text-white/40 uppercase block">Glycemic Impact</span>
                                <span className={`text-base font-bold font-mono ${foodScanResult.glycemicImpact === 'Low' ? 'text-emerald-400' : 'text-orange-400'}`}>{foodScanResult.glycemicImpact}</span>
                              </div>
                            </div>

                            <p className="text-xs text-white/70 bg-[#12141a] p-3 rounded-xl border border-white/10">{foodScanResult.evaluation}</p>

                            <div>
                              <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold block mb-1">Bio-optimal Alternatives Added to Groceries Cart</span>
                              <div className="flex flex-wrap gap-1">
                                {foodScanResult.alternatives?.map((item: string, i: number) => (
                                  <span key={i} className="text-[9.5px] font-mono bg-white/5 py-1 px-2 rounded border border-white/5 text-white/70 font-medium">✨ {item}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* NUTRITION & DISH DISCOVERER BASE PANEL */}
                  <div className="bg-[#0F1115] border border-white/5 rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Flame className="w-5 h-5 text-pink-400" />
                        Circadian Meal Planner & Discovery
                      </h3>
                      
                      {/* Vegan, high protein selection filters */}
                      <div className="flex flex-wrap gap-1 bg-white/5 p-1 rounded-xl">
                        {["All", "Keto", "High Protein", "Vegan", "Gluten Free"].map((filter) => (
                          <button 
                            key={filter}
                            onClick={() => setSelectedMealFilter(filter)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${selectedMealFilter === filter ? "bg-emerald-600 text-white font-bold" : "text-white/40 hover:text-white"}`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {meals
                        .filter(m => selectedMealFilter === "All" || m.name.toLowerCase().includes(selectedMealFilter.toLowerCase()))
                        .map((meal) => (
                          <div key={meal.id} className="bg-[#151922] border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[9px] font-mono text-purple-400 uppercase font-bold">{meal.category} // Glycemic {meal.glycemicImpact}</span>
                                <h4 className="text-sm font-bold text-white mt-1">{meal.name}</h4>
                              </div>
                              <div className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-500/20 font-bold">
                                {meal.healthScore} PTS
                              </div>
                            </div>

                            <div className="grid grid-cols-4 gap-2 text-center text-[11px] mt-4 font-mono bg-white/[0.02] p-1.5 rounded-lg">
                              <div>
                                <span className="text-white/40 block">Cals</span>
                                <span className="text-white font-bold">{meal.calories}</span>
                              </div>
                              <div>
                                <span className="text-white/40 block">Prot</span>
                                <span className="text-emerald-400 font-bold">{meal.protein}g</span>
                              </div>
                              <div>
                                <span className="text-white/40 block">Fib</span>
                                <span className="text-white font-bold">{meal.fiber}g</span>
                              </div>
                              <div>
                                <span className="text-white/40 block">Fat</span>
                                <span className="text-white font-bold">{meal.fat}g</span>
                              </div>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUBSECTION: BIOSYNC CONNECTED RECEPTORS */}
              {appSection === "biosync" && (
                <div className="space-y-6">
                  <div className="bg-[#0F1115] border border-white/10 rounded-3xl p-6 relative overflow-hidden text-left">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
                        <h3 className="text-lg font-bold text-white">BioSync Receptor Terminal</h3>
                      </div>
                      <span className="text-xs font-mono text-cyan-400 font-bold">4 SECURE RECEIVERS ONLINE</span>
                    </div>

                    <p className="text-xs text-white/60 leading-relaxed mb-6">
                      VITAOS maintains real-time WebSocket or secure tokenized cloud linkages with top consumer healthcare devices, rendering diagnostic markers natively.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {devices.map((dev) => (
                        <div key={dev.id} className="bg-[#151922] border border-white/10 p-5 rounded-2xl relative overflow-hidden group">
                          {dev.status === "syncing" && (
                            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 rounded-full blur-xl animate-pulse" />
                          )}
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{dev.type} Receptor</span>
                              <h4 className="text-sm font-bold text-white mt-1 group-hover:text-emerald-400 transition-colors">{dev.name}</h4>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${dev.status === "connected" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-cyan-500/15 text-cyan-400 border-cyan-500/25 animate-pulse"}`}>
                              {dev.status.toUpperCase()}
                            </span>
                          </div>

                          <div className="my-4">
                            <span className="text-xs text-white/40 block">Primary Parameter Matrix</span>
                            <span className="text-lg font-mono-extended font-extrabold text-white block mt-0.5">{dev.primaryMetric}</span>
                          </div>

                          <div className="flex justify-between items-center text-[10px] font-mono text-white/30 pt-3 border-t border-white/5">
                            <span>🔋 BATTERY: {dev.battery}%</span>
                            <span>SYNC: {dev.lastSync}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Simulation trigger controls to check dynamic responsiveness */}
                    <div className="mt-8 bg-[#050505]/40 border border-white/5 p-4 rounded-xl">
                      <span className="text-[10px] font-mono text-white/40 block mb-2 font-bold uppercase">Biotech Stream Emulator</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            const updated = devices.map(d => d.id === "libre" ? { ...d, primaryMetric: "Glucose: 134 mg/dL 📈", status: "syncing" as const } : d);
                            setDevices(updated);
                            // Push alerting glucose notification
                            setNotifications([
                              { id: Date.now(), text: "Continuous Glucose Monitor reporting anomalous glucose velocity (+15mg/dL inside 5 minutes framework). Sequence fiber fats.", time: "Just Now", read: false },
                              ...notifications
                            ]);
                          }}
                          className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-white font-mono transition-all"
                        >
                          Trigger CGM Glucose Spike
                        </button>
                        <button 
                          onClick={() => {
                            const updated = devices.map(d => d.id === "whoop" ? { ...d, primaryMetric: "Recovery: 95% 🚀", lastSync: "Sync'd Just Now" } : d);
                            setDevices(updated);
                          }}
                          className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-white font-mono transition-all"
                        >
                          Trigger Perfect WHOOP Sleep Score
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBSECTION: PRECISION BIOMARKER DIAGNOSTICS */}
              {appSection === "precision-health" && (
                <div className="space-y-6" id="biomarker-precision-anchor">
                  <div className="bg-[#0F1115] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[90px] pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-400" />
                        <h3 className="text-lg font-bold text-white">Biomarker & Blood Report Lab Diagnostics</h3>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 font-bold">DNA COMPATIBLE</span>
                    </div>

                    <p className="text-xs text-white/60 leading-relaxed mb-6">
                      Paste a textual transcription snippet of your high-sensitivity cholesterol, HbA1c, thyroid panel, or Vitamin D ranges. Our Longevity Clinical AI parses the limits and renders critical preventive interventions.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-mono text-white/50 block mb-1.5 uppercase font-bold">Copy/Paste Lab Report Text</label>
                        <textarea 
                          rows={5}
                          value={biomarkerInputText}
                          onChange={(e) => setBiomarkerInputText(e.target.value)}
                          placeholder="Example: Total Cholesterol: 245 mg/dL, LDL: 160 mg/dL, Fasting Vit D: 28 ng/mL..."
                          className="w-full bg-[#050505] border border-white/10 text-white text-xs p-3 rounded-2xl placeholder:text-white/30 focus:outline-none focus:border-purple-500 transition-all font-mono"
                        />
                      </div>

                      {/* Diagnostic trigger buttons */}
                      <div className="flex flex-wrap gap-2 justify-between">
                        <div className="flex gap-2">
                          <button 
                            type="button" 
                            onClick={() => handleAutoSubmitSampleReport("lipid")}
                            className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9.5px] text-white/80 font-mono hover:bg-white/10 transition-all"
                          >
                            🧪 Inject High Cholesterol ApoB report
                          </button>
                          <button 
                            type="button" 
                            onClick={() => handleAutoSubmitSampleReport("metabolic")}
                            className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9.5px] text-white/80 font-mono hover:bg-white/10 transition-all"
                          >
                            🧪 Inject HbA1c Pre-Diabetes report
                          </button>
                        </div>

                        <button 
                          onClick={() => handleBloodReportAnalysisSubmit()}
                          disabled={!biomarkerInputText.trim() || isDiagnosticRunning}
                          className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-45 text-white text-xs uppercase tracking-wider font-bold transition-all font-mono"
                        >
                          {isDiagnosticRunning ? "Running Precision Calculations..." : "Analyze Diagnostics"}
                        </button>
                      </div>

                      {diagnosticReportResult && (
                        <div className="mt-8 bg-[#050505]/60 border border-purple-500/20 p-6 rounded-2xl space-y-6">
                          <div className="flex justify-between items-center pb-3 border-b border-white/5">
                            <div>
                              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block">DIAGNOSTIC REPORT AGGREGATE</span>
                              <h4 className="text-base font-bold text-white">VITA Epigenetic Health Analysis Score</h4>
                            </div>
                            <div className="text-xl font-mono-extended text-purple-400 font-black">{diagnosticReportResult.wellnessScore} / 100</div>
                          </div>

                          {/* Specific Marker Insights */}
                          <div>
                            <span className="text-[11px] font-mono text-white/40 uppercase block mb-3">Key Biomarker Subfraction Anomalies</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {diagnosticReportResult.biomarkerInsights.map((insight, idx) => (
                                <div key={idx} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                                  <div className="flex justify-between items-center text-xs mb-1">
                                    <span className="text-white font-bold">{insight.marker}</span>
                                    <span className="text-red-400 font-mono">{insight.level}</span>
                                  </div>
                                  <p className="text-[11px] text-white/60 leading-relaxed mb-3">{insight.assessment}</p>
                                  <div className="text-[11px] text-emerald-400 font-mono bg-emerald-500/5 p-2 rounded border border-emerald-500/10">
                                    <strong>Remedy Recommendation:</strong> {insight.remedy}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Risks and recommendations columns */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <span className="text-[11px] font-mono text-white/40 uppercase block mb-2">Calculated Wellness Lipids Risks</span>
                              <ul className="space-y-1.5">
                                {diagnosticReportResult.associatedRisks.map((risk, i) => (
                                  <li key={i} className="text-xs text-orange-300 flex items-center gap-1.5">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    {risk}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <span className="text-[11px] font-mono text-white/40 uppercase block mb-2">Preventive Activity Interventions</span>
                              <ul className="space-y-1.5">
                                {diagnosticReportResult.preventiveActions.map((action, i) => (
                                  <li key={i} className="text-xs text-white/80 flex items-start gap-1.5 leading-relaxed">
                                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                                    {action}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Groceries inject notice */}
                          <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/15 flex items-center justify-between">
                            <span className="text-xs text-white/90">
                              🛒 Longevity clinical nutrients added to grocery queue: <strong className="text-emerald-400">{diagnosticReportResult.recommendedGroceries?.join(", ") || "Hass Avocados, broccoli sprouts"}</strong>
                            </span>
                            <button 
                              onClick={() => {
                                setAppSection("grocery");
                                diagnosticReportResult.recommendedGroceries?.forEach((g) => {
                                  addIndividualGrocery(g, "Lab Prescribed Diagnostics", 8.40);
                                });
                              }}
                              className="px-3 py-1.5 rounded bg-emerald-500 text-black font-extrabold text-[10px] uppercase font-mono tracking-wider hover:bg-emerald-400 transition-all"
                            >
                              Go to cart
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SUBSECTION: GROCERY AUTOMATION CHECKOUT */}
              {appSection === "grocery" && (
                <div className="space-y-6">
                  <div className="bg-[#0F1115] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-amber-500" />
                        <h3 className="text-lg font-bold text-white">Autonomous Grocery Routing Engine</h3>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#1e1e12] text-amber-400 border border-amber-500/20">ONE-CLICK INTEGRATION ENABLED</span>
                    </div>

                    <p className="text-xs text-white/60 leading-relaxed mb-6">
                      Nucleus AI continuously synthesizes raw nutrient shortages and pre-populates your selected partner shipping cart queue.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
                      <span className="text-xs text-white/50 block font-mono">Select Delivery Partner Terminal:</span>
                      <div className="col-span-2 flex gap-1.5 flex-wrap">
                        {["zepto", "blinkit", "bigbasket", "instacart"].map((partner) => (
                          <button 
                            key={partner}
                            onClick={() => setGroceryPartner(partner as any)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wide transition-all ${groceryPartner === partner ? "bg-amber-600 text-white font-bold border border-amber-500/30" : "bg-white/5 text-white/40 hover:text-white"}`}
                          >
                            {partner}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {groceries.map((item, idx) => (
                        <div 
                          key={idx}
                          onClick={() => toggleSelectGrocery(idx)}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${item.selected ? "bg-white/[0.03] border-white/10" : "bg-black/20 border-white/5 opacity-40"}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${item.selected ? 'bg-amber-500 text-black border-amber-500' : 'border-white/25 text-transparent'}`}>
                              <Check className="w-3.5 h-3.5 stroke-[3px]" />
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-white block">{item.name}</span>
                              <span className="text-[9px] font-mono text-white/40 uppercase">{item.category}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-xs text-amber-500 font-mono font-bold">${item.price.toFixed(2)}</span>
                            {item.substitute && <span className="text-[9px] font-mono block text-emerald-400 mt-0.5">Recommended replacement</span>}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-white/5 mb-6">
                      <span className="text-xs text-white/40 font-mono">STATION INTEGRATED TOTAL VALUE</span>
                      <span className="text-lg font-mono font-black text-amber-500">
                        ${groceries.filter(g => g.selected).reduce((sum, g) => sum + g.price, 0).toFixed(2)}
                      </span>
                    </div>

                    <button 
                      onClick={triggerOneClickCheckout}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-xs tracking-widest uppercase hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {oneClickSuccess ? "PURCHASED SENT TO YOUR APP TERMINAL!" : `DISPATCH ONE-CLICK ORDER TO ${groceryPartner.toUpperCase()}`}
                    </button>

                    {oneClickSuccess && (
                      <div className="mt-4 p-4 bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-400 rounded-xl text-center font-mono">
                        ✓ SUCCESS! Telemetry dispatched. Your secure instant groceries order has been transmitted successfully. Delivery tracking is online.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SUBSECTION: Circles & Corporate Team boards */}
              {appSection === "circles" && (
                <div className="space-y-6">
                  
                  {/* GAMIFICATION STATS */}
                  <div className="bg-[#0F1115] border border-white/10 rounded-2xl p-6 mb-6">
                    <span className="text-[10px] font-mono text-cyan-400 tracking-wider font-bold block mb-2">EPIGENETIC GAMIFICATION SHIELD</span>
                    <h3 className="text-lg font-bold text-white mb-4">Active Longevity Streaks & Milestones</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {challenges.map((chal) => (
                        <div key={chal.id} className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
                          <span className="text-[10px] font-mono text-white/40 tracking-wider block uppercase">{chal.category} focus // {chal.daysLeft}d left</span>
                          <span className="text-xs font-bold text-white block mt-1">{chal.title}</span>
                          
                          <div className="my-3">
                            <div className="flex justify-between text-[10px] font-mono text-white/50 mb-1">
                              <span>Progress</span>
                              <span>{chal.progress} / {chal.target} {chal.unit}</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-cyan-400" style={{ width: `${Math.min(100, (chal.progress/chal.target) * 100)}%` }} />
                            </div>
                          </div>

                          <span className="text-[10px] font-mono text-emerald-400 block font-bold">+{chal.rewardPoints} VITA COINS</span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-white/40 uppercase block mb-3 font-bold">Unlocked Bio-Shield Badges</span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {badges.map((badge) => (
                          <div key={badge.id} className={`p-4 rounded-xl border text-center ${badge.unlocked ? 'bg-purple-500/5 border-purple-500/20 opacity-100' : 'bg-black/40 border-white/5 opacity-40'}`}>
                            <Award className={`w-8 h-8 mx-auto mb-2 ${badge.unlocked ? 'text-purple-400' : 'text-white/20'}`} />
                            <span className="text-xs font-bold text-white block">{badge.title}</span>
                            <span className="text-[9.5px] text-white/50 block leading-relaxed mt-1">{badge.description}</span>
                            {badge.unlocked && <span className="text-[9px] font-mono text-purple-400 block mt-2">Unlocked {badge.unlockedAt}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CORPORATE B2B LEADERBOARD */}
                  <div className="bg-[#0F1115] border border-white/5 rounded-2xl p-6">
                    <span className="text-[10px] font-mono text-purple-400 tracking-wider font-bold block mb-2">B2B ENTERPRISE OVERVIEW MODULE</span>
                    <h3 className="text-lg font-bold text-white mb-4">VITAOS Active Circle Directory</h3>

                    <div className="space-y-4">
                      {CORPORATE_TEAMS.map((team, index) => (
                        <div key={index} className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.05] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <h4 className="text-sm font-bold text-white">{team.name}</h4>
                            <span className="text-xs text-white/40 block mt-0.5">{team.memberCount} Employee Members mapped • SOC2 Secured</span>
                          </div>

                          <div className="flex gap-6 items-center">
                            <div className="text-right">
                              <span className="text-[10px] font-mono text-white/30 block uppercase font-bold">Participation</span>
                              <span className="text-sm font-mono text-white font-bold">{team.participationPercentage}%</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-mono text-white/30 block uppercase font-bold">Circular Vitals</span>
                              <span className="text-sm font-mono text-emerald-400 font-extrabold">{team.teamHealthScore}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUBSECTION: USER PROFILE SETTINGS CALIBRATION */}
              {appSection === "profile" && (
                <div className="space-y-6">
                  <div className="bg-[#0F1115] border border-white/10 rounded-3xl p-6">
                    <span className="text-[10px] font-mono text-purple-400 tracking-widest block mb-2 font-bold uppercase">PHYSICAL METRICS TERMINAL</span>
                    <h3 className="text-lg font-extrabold text-white mb-4">Personal Calibration Index</h3>

                    {/* Change profile stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-white/60 block mb-1">Age (Years)</label>
                        <input 
                          type="number" 
                          value={userProfile.age} 
                          onChange={(e) => setUserProfile({ ...userProfile, age: parseInt(e.target.value) || userProfile.age })}
                          className="w-full bg-[#050505] border border-white/10 text-white p-3 text-xs rounded-xl font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/60 block mb-1">Gender Identification</label>
                        <select 
                          value={userProfile.gender} 
                          onChange={(e) => setUserProfile({ ...userProfile, gender: e.target.value })}
                          className="w-full bg-[#050505] border border-white/10 text-white p-3 text-xs rounded-xl font-mono appearance-none"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Non-Binary</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-white/60 block mb-1">Height (cm)</label>
                        <input 
                          type="number" 
                          value={userProfile.height} 
                          onChange={(e) => setUserProfile({ ...userProfile, height: parseInt(e.target.value) || userProfile.height })}
                          className="w-full bg-[#050505] border border-white/10 text-white p-3 text-xs rounded-xl font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/60 block mb-1">Weight (kg)</label>
                        <input 
                          type="number" 
                          value={userProfile.weight} 
                          onChange={(e) => setUserProfile({ ...userProfile, weight: parseInt(e.target.value) || userProfile.weight })}
                          className="w-full bg-[#050505] border border-white/10 text-white p-3 text-xs rounded-xl font-mono"
                        />
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                      <span className="text-xs text-white">Baseline Telemetry calibrated successfully. Your daily protein target tracks at <strong className="text-emerald-400">{Math.round(userProfile.weight * 2)}g</strong> inside active cardiac pacing windows.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --------------------- MODAL: INTERACTIVE ONBOARDING WIZARD --------------------- */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-[#050505]/95 z-50 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-[#0F1115] border border-white/10 w-full max-w-xl rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Dna className="w-5 h-5 text-emerald-400 animate-pulse" />
                <h3 className="text-lg font-mono-extended font-extrabold text-white">VITA Epigenetic Calibration Wizard</h3>
              </div>
              <button onClick={() => setShowOnboarding(false)} className="text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-white/60 leading-relaxed mb-6">
              Establish your target longevity parameters. VITA Nucleus AI recalibrates continuous telemetry curves immediately based on physical objectives.
            </p>

            <div className="space-y-4 max-h-[420px] overflow-y-auto mb-6 pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-white/50 block mb-1 uppercase font-bold">Chronological Age</label>
                  <input 
                    type="number" 
                    value={onboardingForm.age}
                    onChange={(e) => setOnboardingForm({ ...onboardingForm, age: parseInt(e.target.value) || 30 })}
                    className="w-full bg-[#050505] border border-white/10 text-white text-xs p-3 rounded-xl font-mono" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/50 block mb-1 uppercase font-bold">Biotech Sex Flag</label>
                  <select 
                    value={onboardingForm.gender}
                    onChange={(e) => setOnboardingForm({ ...onboardingForm, gender: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 text-white text-xs p-3 rounded-xl font-mono appearance-none"
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Non-Binary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-white/50 block mb-1 uppercase font-bold">Height (cm)</label>
                  <input 
                    type="number" 
                    value={onboardingForm.height}
                    onChange={(e) => setOnboardingForm({ ...onboardingForm, height: parseInt(e.target.value) || 170 })}
                    className="w-full bg-[#050505] border border-white/10 text-white text-xs p-3 rounded-xl font-mono" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/50 block mb-1 uppercase font-bold">Mass Weight (kg)</label>
                  <input 
                    type="number" 
                    value={onboardingForm.weight}
                    onChange={(e) => setOnboardingForm({ ...onboardingForm, weight: parseInt(e.target.value) || 60 })}
                    className="w-full bg-[#050505] border border-white/10 text-white text-xs p-3 rounded-xl font-mono" 
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-white/50 block mb-1 uppercase font-bold">Zone 2 Aerobic Work Index</label>
                <select 
                  value={onboardingForm.activityLevel}
                  onChange={(e) => setOnboardingForm({ ...onboardingForm, activityLevel: e.target.value })}
                  className="w-full bg-[#050505] border border-white/10 text-white text-xs p-3 rounded-xl font-mono appearance-none"
                >
                  <option>Highly Active (4-5x/week Zone 2)</option>
                  <option>Moderately Active (2-3x/week aerobes)</option>
                  <option>Passive (Rehabilitation recovery focus)</option>
                </select>
              </div>

              {/* Longevity targets multi-selector mock */}
              <div>
                <label className="text-[10px] font-mono text-white/50 block mb-1 uppercase font-bold">Target Epigenetic Focus Areas</label>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {["Cardiovascular Defense", "Mitochondrial Longevity", "Cognitive Focus", "Stress Resilience", "Antioxidant Saturated Index"].map((val) => {
                    const exists = onboardingForm.goals.includes(val);
                    return (
                      <button 
                        key={val}
                        onClick={() => {
                          const next = exists ? onboardingForm.goals.filter(g => g !== val) : [...onboardingForm.goals, val];
                          setOnboardingForm({ ...onboardingForm, goals: next });
                        }}
                        className={`text-[10px] font-mono px-2.5 py-1.5 rounded-lg border transition-all ${exists ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-[#050505] text-white/40 border-white/10'}`}
                      >
                        {val}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <button 
              id="apply-onboarding-btn"
              onClick={handleApplyOnboarding}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-extrabold text-xs tracking-wider uppercase font-mono shadow-lg shadow-emerald-500/25 hover:opacity-90 transition-all text-center"
            >
              Recalibrate Central Telemetry Engine
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
