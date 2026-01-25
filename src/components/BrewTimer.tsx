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
    <div className="flex flex-1 flex-col items-center justify-between bg-zinc-950 p-8 text-white">
      {/* 頂部總進度條 */}
      <div className="fixed top-0 left-0 w-full">
        <ProgressBar progress={totalProgress} />
      </div>

      <div className="mt-10 text-center">
        <h2 className="mb-1 text-xs tracking-widest text-zinc-500 uppercase">
          {recipe.author}
        </h2>
        <h1 className="text-2xl font-bold tracking-tight">
          {t(recipe.nameKey)}
        </h1>
      </div>

      {/* 計時器主體 */}
      <div className="flex flex-col items-center">
        <div className="mb-4 font-mono text-[120px] leading-none font-black tracking-tighter tabular-nums">
          {Math.floor(seconds / 60)}:
          {(seconds % 60).toString().padStart(2, "0")}
        </div>

        {/* 階段進度條視覺化 */}
        <div className="w-64 overflow-hidden rounded-full">
          <ProgressBar
            progress={stepProgress}
            colorClass="bg-white"
            heightClass="h-1.5"
          />
        </div>
      </div>

      {/* 底部指令區 */}
      <div className="mb-10 w-full max-w-sm rounded-4xl border border-white/10 bg-zinc-900/80 p-7 shadow-2xl backdrop-blur-xl">
        {/* 1. 頂部狀態列：模式與開關 */}
        <StepStatusBar
          stepType={currentStep.type}
          switchStatus={currentStep.switch}
          t={t}
          tCommon={tCommon}
        />

        {/* 2. 主資訊區 */}
        <div className="mb-10 flex items-end justify-between">
          {/* 左：指令標題 */}
          <div className="flex-1 pr-4">
            <h3 className="text-3xl leading-tight font-black tracking-tight text-white">
              {t(currentStep.noteKey)}
            </h3>
          </div>

          {/* 右側：參數組 */}
          <div className="flex flex-col items-end gap-1">
            {/* 溫度顯示：根據溫度切換顏色 */}
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] font-bold tracking-tighter text-zinc-500 uppercase">
                {t("common.temp")}
              </span>
              <div className="flex items-baseline transition-all duration-500">
                <span
                  className={`text-2xl font-black tracking-tighter tabular-nums ${
                    isWarmWater
                      ? "text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                      : "text-orange-500"
                  }`}
                >
                  {displayTemp}
                </span>
                <span
                  className={`ml-0.5 text-xs font-bold ${isWarmWater ? "text-cyan-900" : "text-zinc-600"}`}
                >
                  °C
                </span>
              </div>
            </div>

            {/* 重量顯示：始終保持醒目 */}
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] font-bold tracking-tighter text-zinc-500 uppercase">
                {t("common.water")}
              </span>
              <span className="text-5xl font-black tracking-tighter text-white tabular-nums">
                {Math.round(
                  (currentStep.targetWater / recipe.defaultCoffee) *
                    initialCoffee,
                )}
                <span className="ml-1 text-lg font-bold text-zinc-500">g</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3. 按鈕區 */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`rounded-2xl py-4 font-bold transition-all active:scale-95 ${
              isActive
                ? "bg-zinc-800 text-zinc-400"
                : "bg-white text-black shadow-lg shadow-white/10"
            }`}
          >
            {isActive ? tCommon("pause") : tCommon("start_brew")}
          </button>
          <button
            onClick={() => router.back()}
            className="rounded-2xl bg-zinc-800/50 py-4 font-bold text-zinc-500 transition-colors hover:text-white"
          >
            {tCommon("exit")}
          </button>
        </div>
      </div>
    </div>
  );
}
