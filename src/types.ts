/**
 * VITAOS - TypeScript Interface definitions for Predictive Health Ecosystem
 */

export interface UserProfile {
  age: number;
  gender: string;
  height: number;
  weight: number;
  goals: string[];
  dietaryPreferences: string[];
  allergies: string[];
  activityLevel: string;
}

export interface MetricCard {
  id: string;
  label: string;
  value: string | number;
  trend: string;
  unit?: string;
  color: "emerald" | "cyan" | "purple" | "orange";
  percentage?: number;
  icon: string;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  healthScore: number;
  glycemicImpact: "Low" | "Medium" | "High";
  category: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  micronutrients?: string[];
  evaluation?: string;
}

export interface DeviceConnection {
  id: string;
  name: string;
  type: "watch" | "ring" | "patch" | "scale";
  status: "connected" | "syncing" | "disconnected";
  battery: number;
  primaryMetric: string;
  lastSync: string;
}

export interface BiomarkerInsight {
  marker: string;
  level: string;
  assessment: string;
  remedy: string;
}

export interface BiomarkerReportResult {
  wellnessScore: number;
  biomarkerInsights: BiomarkerInsight[];
  associatedRisks: string[];
  preventiveActions: string[];
  deficiencies: string[];
  recommendedGroceries: string[];
}

export interface GroceryItem {
  name: string;
  category: string;
  substitute?: string;
  price: number;
  selected: boolean;
}

export interface CorporateTeam {
  name: string;
  memberCount: number;
  teamHealthScore: number;
  participationPercentage: number;
  activeChallenges: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Challenge {
  id: string;
  title: string;
  rewardPoints: number;
  progress: number;
  target: number;
  unit: string;
  category: "fitness" | "sleep" | "nutrition" | "stress";
  daysLeft: number;
}
