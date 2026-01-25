"use client";

import { useMemo, useState } from "react";
import { useTimer } from "@/hooks/useTimer";
import type { Recipe } from "@/types/recipes";
import { ProgressBar } from "./ProgressBar";
import { StepStatusBar } from "./StepStatusBar";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function BrewTimer({
  recipe,
  initialCoffee,
}: {
  recipe: Recipe;
  initialCoffee: number;
}) {
  const t = useTranslations();
  const tCommon = useTranslations("common");
  const router = useRouter();

  const [isActive, setIsActive] = useState(false);
  const { seconds } = useTimer(isActive);

  const currentStepIndex = recipe.steps.findLastIndex(
    (step) => seconds >= step.startAt,
  );
  const currentStep = recipe.steps[currentStepIndex] || recipe.steps[0];
  const nextStep = recipe.steps[currentStepIndex + 1];

  const stepProgress = useMemo(() => {
    if (!nextStep) return 100;
    const duration = nextStep.startAt - currentStep.startAt;
    const elapsed = seconds - currentStep.startAt;
    return Math.min((elapsed / duration) * 100, 100);
  }, [seconds, currentStep, nextStep]);

  const totalDuration = recipe.steps[recipe.steps.length - 1].startAt + 30; // 假設結束後多留 30s 流乾
  const totalProgress = Math.min((seconds / totalDuration) * 100, 100);

  const displayTemp = currentStep.temp || recipe.temp;
  const isWarmWater = displayTemp <= 85; // 假設 85°C 以下為溫水

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-8 bg-zinc-950 text-white">
      {/* 頂部總進度條 */}
      <div className="fixed top-0 left-0 w-full">
        <ProgressBar progress={totalProgress} />
      </div>

      <div className="text-center mt-10">
        <h2 className="text-zinc-500 uppercase tracking-widest text-xs mb-1">
          {recipe.author}
        </h2>
        <h1 className="text-2xl font-bold tracking-tight">
          {t(recipe.nameKey)}
        </h1>
      </div>

      {/* 計時器主體 */}
      <div className="flex flex-col items-center">
        <div className="text-[120px] leading-none font-mono font-black tabular-nums tracking-tighter mb-4">
          {Math.floor(seconds / 60)}:
          {(seconds % 60).toString().padStart(2, "0")}
        </div>

        {/* 階段進度條視覺化 */}
        <div className="w-64 rounded-full overflow-hidden">
          <ProgressBar
            progress={stepProgress}
            colorClass="bg-white"
            heightClass="h-1.5"
          />
        </div>
      </div>

      {/* 底部指令區 */}
      <div className="w-full max-w-sm bg-zinc-900/80 backdrop-blur-xl rounded-4xl p-7 mb-10 border border-white/10 shadow-2xl">
        {/* 1. 頂部狀態列：模式與開關 */}
        <StepStatusBar
          stepType={currentStep.type}
          switchStatus={currentStep.switch}
          t={t}
          tCommon={tCommon}
        />

        {/* 2. 主資訊區 */}
        <div className="flex justify-between items-end mb-10">
          {/* 左：指令標題 */}
          <div className="flex-1 pr-4">
            <h3 className="text-3xl font-black leading-tight tracking-tight text-white">
              {t(currentStep.noteKey)}
            </h3>
          </div>

          {/* 右側：參數組 */}
          <div className="flex flex-col items-end gap-1">
            {/* 溫度顯示：根據溫度切換顏色 */}
            <div className="flex items-baseline gap-1">
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">
                {t("common.temp")}
              </span>
              <div className="flex items-baseline transition-all duration-500">
                <span
                  className={`text-2xl font-black tabular-nums tracking-tighter ${
                    isWarmWater
                      ? "text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                      : "text-orange-500"
                  }`}>
                  {displayTemp}
                </span>
                <span
                  className={`text-xs ml-0.5 font-bold ${isWarmWater ? "text-cyan-900" : "text-zinc-600"}`}>
                  °C
                </span>
              </div>
            </div>

            {/* 重量顯示：始終保持醒目 */}
            <div className="flex items-baseline gap-1">
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">
                {t("common.water")}
              </span>
              <span className="text-5xl font-black tabular-nums text-white tracking-tighter">
                {Math.round(
                  (currentStep.targetWater / recipe.defaultCoffee) *
                    initialCoffee,
                )}
                <span className="text-lg ml-1 font-bold text-zinc-500">g</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3. 按鈕區 */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`py-4 rounded-2xl font-bold transition-all active:scale-95 ${
              isActive
                ? "bg-zinc-800 text-zinc-400"
                : "bg-white text-black shadow-lg shadow-white/10"
            }`}>
            {isActive ? tCommon("pause") : tCommon("start_brew")}
          </button>
          <button
            onClick={() => router.back()}
            className="py-4 rounded-2xl font-bold bg-zinc-800/50 text-zinc-500 hover:text-white transition-colors">
            {tCommon("exit")}
          </button>
        </div>
      </div>
    </div>
  );
}
