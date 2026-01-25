import { BREW_STEP_TYPES, SWITCH_STATUS } from "@/constants/recipes";

export type BrewMethod =
  | "V60"
  | "V60 Switch"
  | "Aeropress"
  | "French Press"
  | "Chemex";

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
