
import type { Recipe } from '@/types/recipes';
import { BREW_STEP_TYPES, SWITCH_STATUS } from '@/constants/recipes';

export const recipes: Recipe[] = [
  {
    id: 'god-devil-standard',
    method: 'V60 Switch',
    nameKey: 'recipes.god_devil_standard.name',
    author: 'Tetsu Kasuya',
    descriptionKey: 'recipes.god_devil_standard.description',
    defaultCoffee: 20,
    ratio: 15,
    temp: 92,
    grindSize: 'Coarse',
    steps: [
      { type: BREW_STEP_TYPES.BLOOM, startAt: 0, targetWater: 50, temp: 92, switch: SWITCH_STATUS.CLOSED, noteKey: 'steps.bloom' },
      { type: BREW_STEP_TYPES.POUR, startAt: 40, targetWater: 120, temp: 92, switch: SWITCH_STATUS.OPEN, noteKey: 'steps.first_pour' },
      { type: BREW_STEP_TYPES.POUR, startAt: 90, targetWater: 200, temp: 92, switch: SWITCH_STATUS.OPEN, noteKey: 'steps.second_pour' },
      { type: BREW_STEP_TYPES.POUR, startAt: 130, targetWater: 300, temp: 70, switch: SWITCH_STATUS.CLOSED, noteKey: 'steps.pour_sweetness' },
      { type: BREW_STEP_TYPES.WAIT, startAt: 165, targetWater: 300, switch: SWITCH_STATUS.OPEN, noteKey: 'steps.drain' },
    ]
  },
  {
    id: 'tetsu-kasuya-46',
    method: 'V60',
    nameKey: 'recipes.tetsu_46.name',
    author: 'Tetsu Kasuya',
    descriptionKey: 'recipes.tetsu_46.description',
    defaultCoffee: 20,
    ratio: 15,
    temp: 92,
    grindSize: 'Coarse',
    steps: [
      { type: BREW_STEP_TYPES.BLOOM, startAt: 0, targetWater: 60, noteKey: 'steps.bloom' },
      { type: BREW_STEP_TYPES.POUR, startAt: 45, targetWater: 120, noteKey: 'steps.pour_sweetness' },
      { type: BREW_STEP_TYPES.POUR, startAt: 90, targetWater: 180, noteKey: 'steps.pour_strength' },
      { type: BREW_STEP_TYPES.POUR, startAt: 135, targetWater: 240, noteKey: 'steps.pour_final' },
      { type: BREW_STEP_TYPES.WAIT, startAt: 180, targetWater: 300, noteKey: 'steps.drain' },
    ]
  },
  {
    id: 'god-devil-switch',
    method: 'V60 Switch',
    nameKey: 'recipes.devil_pour.name',
    author: 'Tetsu Kasuya',
    descriptionKey: 'recipes.devil_pour.description',
    defaultCoffee: 20,
    ratio: 14,
    temp: 92,
    grindSize: 'Medium Coarse',
    steps: [
      {
        type: BREW_STEP_TYPES.BLOOM,
        startAt: 0,
        targetWater: 60,
        temp: 92,
        switch: SWITCH_STATUS.OPEN,
        noteKey: 'steps.bloom'
      },
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 30,
        targetWater: 120,
        temp: 92,
        switch: SWITCH_STATUS.OPEN,
        noteKey: 'steps.first_pour'
      },
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 75,
        targetWater: 280,
        temp: 70,
        switch: SWITCH_STATUS.CLOSED,
        noteKey: 'steps.pour_sweetness'
      },
      {
        type: BREW_STEP_TYPES.WAIT,
        startAt: 105,
        targetWater: 280,
        switch: SWITCH_STATUS.OPEN,
        noteKey: 'steps.drain'
      },
    ]
  },
];