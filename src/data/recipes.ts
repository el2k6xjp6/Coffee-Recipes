import type { Recipe } from "@/types/recipes";
import { BREW_STEP_TYPES, SWITCH_STATUS } from "@/constants/recipes";

export const recipes: Recipe[] = [
  {
    id: "god-devil-standard",
    method: "V60 Switch",
    nameKey: "recipes.god_devil_standard.name",
    author: "Tetsu Kasuya",
    descriptionKey: "recipes.god_devil_standard.description",
    defaultCoffee: 20,
    ratio: 15,
    temp: 92,
    grindSize: "Grind.Coarse",
    steps: [
      {
        type: BREW_STEP_TYPES.BLOOM,
        startAt: 0,
        targetWater: 50,
        temp: 92,
        switch: SWITCH_STATUS.CLOSED,
        noteKey: "steps.bloom",
      },
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 40,
        targetWater: 120,
        temp: 92,
        switch: SWITCH_STATUS.OPEN,
        noteKey: "steps.first_pour",
      },
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 90,
        targetWater: 200,
        temp: 92,
        switch: SWITCH_STATUS.OPEN,
        noteKey: "steps.second_pour",
      },
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 130,
        targetWater: 300,
        temp: 70,
        switch: SWITCH_STATUS.CLOSED,
        noteKey: "steps.pour_sweetness",
      },
      {
        type: BREW_STEP_TYPES.WAIT,
        startAt: 165,
        targetWater: 300,
        switch: SWITCH_STATUS.OPEN,
        noteKey: "steps.drain",
      },
    ],
  },
  {
    id: "tetsu-kasuya-46",
    method: "V60",
    nameKey: "recipes.tetsu_46.name",
    author: "Tetsu Kasuya",
    descriptionKey: "recipes.tetsu_46.description",
    defaultCoffee: 20,
    ratio: 15,
    temp: 92,
    grindSize: "Grind.Coarse",
    steps: [
      {
        type: BREW_STEP_TYPES.BLOOM,
        startAt: 0,
        targetWater: 60,
        noteKey: "steps.bloom",
      },
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 45,
        targetWater: 120,
        noteKey: "steps.pour_sweetness",
      },
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 90,
        targetWater: 180,
        noteKey: "steps.pour_strength",
      },
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 135,
        targetWater: 240,
        noteKey: "steps.pour_strength",
      },
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 180,
        targetWater: 300,
        noteKey: "steps.pour_final",
      },
      {
        type: BREW_STEP_TYPES.WAIT,
        startAt: 225,
        targetWater: 300,
        noteKey: "steps.drain",
      },
    ],
  },
  {
    id: "god-devil-switch",
    method: "V60 Switch",
    nameKey: "recipes.devil_pour.name",
    author: "Tetsu Kasuya",
    descriptionKey: "recipes.devil_pour.description",
    defaultCoffee: 20,
    ratio: 14,
    temp: 92,
    grindSize: "Grind.MediumCoarse",
    steps: [
      {
        type: BREW_STEP_TYPES.BLOOM,
        startAt: 0,
        targetWater: 60,
        temp: 92,
        switch: SWITCH_STATUS.OPEN,
        noteKey: "steps.bloom",
      },
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 30,
        targetWater: 120,
        temp: 92,
        switch: SWITCH_STATUS.OPEN,
        noteKey: "steps.first_pour",
      },
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 75,
        targetWater: 280,
        temp: 70,
        switch: SWITCH_STATUS.CLOSED,
        noteKey: "steps.pour_sweetness",
      },
      {
        type: BREW_STEP_TYPES.WAIT,
        startAt: 105,
        targetWater: 280,
        switch: SWITCH_STATUS.OPEN,
        noteKey: "steps.drain",
      },
    ],
  },
  {
    id: "hoffmann-v60-1cup",
    method: "V60",
    nameKey: "recipes.hoffmann_v60.name",
    author: "James Hoffmann",
    descriptionKey: "recipes.hoffmann_v60.description",
    defaultCoffee: 15,
    ratio: 16.7, // 60g/1L
    temp: 100, // James 建議越熱越好
    grindSize: "Grind.MediumFine",
    steps: [
      {
        type: BREW_STEP_TYPES.BLOOM,
        startAt: 0,
        targetWater: 30, // 2x 粉重
        noteKey: "steps.bloom_swirl", // 悶蒸並搖晃
      },
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 45,
        targetWater: 150, // 60% 總水量
        noteKey: "steps.pour_fast_60",
      },
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 75, // 1:15
        targetWater: 250, // 100% 總水量
        noteKey: "steps.pour_slow_100",
      },
      {
        type: BREW_STEP_TYPES.WAIT,
        startAt: 105, // 1:45 (給予注水完成後的處理時間)
        targetWater: 250,
        noteKey: "steps.stir_swirl", // 攪拌一圈並搖晃
      },
      {
        type: BREW_STEP_TYPES.WAIT,
        startAt: 180, // 3:00
        targetWater: 250,
        noteKey: "steps.drain",
      },
    ],
  },
  {
    id: "simple-switch-immersion",
    method: "Switch / Clever",
    nameKey: "recipes.switch_immersion.name",
    author: "Coffee Lovers",
    descriptionKey: "recipes.switch_immersion.description",
    defaultCoffee: 20,
    ratio: 16,
    temp: 93,
    grindSize: "Grind.Medium",
    steps: [
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 0,
        targetWater: 320,
        temp: 93,
        switch: SWITCH_STATUS.CLOSED, // 全程關閉
        noteKey: "steps.pour_all_switch", // 一次注完
      },
      {
        type: BREW_STEP_TYPES.WAIT,
        startAt: 120, // 浸泡 2 分鐘
        targetWater: 320,
        switch: SWITCH_STATUS.CLOSED,
        noteKey: "steps.steep", // 靜置浸泡
      },
      {
        type: BREW_STEP_TYPES.WAIT,
        startAt: 130, // 2:10 開始流
        targetWater: 320,
        switch: SWITCH_STATUS.OPEN, // 打開開關
        noteKey: "steps.release_drain", // 釋放濾杯
      },
    ],
  },
  // ... (原本的 V60 和 Switch 食譜)

  // --- 新增 3: Aeropress 愛樂壓 (James Hoffmann 手法) ---
  {
    id: "aeropress-standard",
    method: "Aeropress",
    nameKey: "recipes.aeropress_standard.name",
    author: "James Hoffmann",
    descriptionKey: "recipes.aeropress_standard.description",
    defaultCoffee: 11,
    ratio: 18.2, // 11g / 200ml
    temp: 99,
    grindSize: "Grind.Fine",
    steps: [
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 0,
        targetWater: 200,
        noteKey: "steps.pour_all", // 一次注滿
      },
      {
        type: BREW_STEP_TYPES.WAIT,
        startAt: 30, // 0:30
        targetWater: 200,
        noteKey: "steps.wait_steep", // 靜置浸泡到 2:00
      },
      {
        type: BREW_STEP_TYPES.WAIT,
        startAt: 120, // 2:00
        targetWater: 200,
        noteKey: "steps.swirl_press", // 輕搖並壓桿 (30秒內壓完)
      },
    ],
  },

  // --- 新增 4: French Press 法式濾壓壺 (經典 4 分鐘) ---
  {
    id: "french-press-classic",
    method: "French Press",
    nameKey: "recipes.french_press_classic.name",
    author: "Classic",
    descriptionKey: "recipes.french_press_classic.description",
    defaultCoffee: 30,
    ratio: 16.7, // 30g / 500ml
    temp: 94,
    grindSize: "Grind.Coarse",
    steps: [
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 0,
        targetWater: 500,
        noteKey: "steps.pour_all",
      },
      {
        type: BREW_STEP_TYPES.WAIT,
        startAt: 60, // 1:00 (只是標記點，實際上是等 4 分鐘)
        targetWater: 500,
        noteKey: "steps.wait_4_min", // 等待 4 分鐘
      },
      {
        type: BREW_STEP_TYPES.WAIT,
        startAt: 240, // 4:00
        targetWater: 500,
        noteKey: "steps.break_crust_scoop", // 破渣並撈除浮沫
      },
      {
        type: BREW_STEP_TYPES.WAIT,
        startAt: 300, // 5:00 (選用：稍微靜置讓粉沉底)
        targetWater: 500,
        noteKey: "steps.plunge_pour", // 壓下濾網並倒出
      },
    ],
  },

  // --- 新增 5: Chemex 經典手沖 ---
  {
    id: "chemex-classic",
    method: "Chemex",
    nameKey: "recipes.chemex_classic.name",
    author: "Classic",
    descriptionKey: "recipes.chemex_classic.description",
    defaultCoffee: 40, // Chemex 通常煮比較大壺
    ratio: 15, // 1:15
    temp: 93,
    grindSize: "Grind.MediumCoarse",
    steps: [
      {
        type: BREW_STEP_TYPES.BLOOM,
        startAt: 0,
        targetWater: 80, // 2x 粉重
        noteKey: "steps.bloom",
      },
      {
        type: BREW_STEP_TYPES.POUR,
        startAt: 45,
        targetWater: 600,
        noteKey: "steps.pour_steady", // 穩定緩慢注水至目標
      },
      {
        type: BREW_STEP_TYPES.WAIT,
        startAt: 210, // 3:30 (Chemex 流速慢，通常總時間較長)
        targetWater: 600,
        noteKey: "steps.drain",
      },
    ],
  },
];
