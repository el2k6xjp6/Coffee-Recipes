import { BREW_STEP_TYPES, SWITCH_STATUS } from "@/constants/recipes";

export type BrewMethod =
  | "V60" // 錐形代表
  | "Kalita Wave" // 平底代表 (新增)
  | "Origami" // 折紙濾杯 (新增)
  | "V60 Switch" // 浸泡/手沖切換
  | "Switch / Clever" // 聰明濾杯
  | "Aeropress" // 愛樂壓
  | "French Press" // 法式濾壓壺
  | "Chemex" // 美式經典
  | "Moka Pot" // 摩卡壺 (新增)
  | "Siphon"; // 虹吸壺 (新增)

export interface BrewStep {
  type: BrewStepType;
  startAt: number;
  targetWater: number;
  noteKey: string;
  temp?: number;
  switch?: SwitchStatus;
}

export interface Recipe {
  id: string;
  method: BrewMethod;
  nameKey: string;
  author: string;
  descriptionKey: string;
  defaultCoffee: number;
  ratio: number;
  temp: number;
  grindSize: string;
  steps: BrewStep[];
}

export type BrewStepType =
  (typeof BREW_STEP_TYPES)[keyof typeof BREW_STEP_TYPES];
export type SwitchStatus = (typeof SWITCH_STATUS)[keyof typeof SWITCH_STATUS];
