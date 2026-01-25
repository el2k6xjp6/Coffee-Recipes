"use client";

import { useMemo, useState } from "react";
import { useTimer } from "@/hooks/useTimer";
import type { Recipe } from "@/types/recipes";
import { ProgressBar } from "./ProgressBar";
import { StepStatusBar } from "./StepStatusBar";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Play, Pause, X, Thermometer, Timer } from "lucide-react";

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

  // 邏輯保持不變
  const currentStepIndex = recipe.steps.findLastIndex(
    (step) => seconds >= step.startAt,
  );
  const currentStep = recipe.steps[currentStepIndex] || recipe.steps[0];
  const nextStep = recipe.steps[currentStepIndex + 1];

  // 步驟進度 (0-100)
  const stepProgress = useMemo(() => {
    if (!nextStep) return 100;
    const duration = nextStep.startAt - currentStep.startAt;
    const elapsed = seconds - currentStep.startAt;
    return Math.min((elapsed / duration) * 100, 100);
  }, [seconds, currentStep, nextStep]);

  // 總進度 (0-100)
  const totalDuration = recipe.steps[recipe.steps.length - 1].startAt + 30;
  const totalProgress = Math.min((seconds / totalDuration) * 100, 100);

  // 溫度邏輯
  const displayTemp = currentStep.temp || recipe.temp;
  const isWarmWater = displayTemp <= 85;

  // 計算當前目標水量
  const targetWater = Math.round(
    (currentStep.targetWater / recipe.defaultCoffee) * initialCoffee,
  );

  return (
    <div className="relative flex flex-1 flex-col items-center justify-between overflow-hidden bg-zinc-950 p-6 text-white sm:p-8">
      {/* 1. 背景氛圍光 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-zinc-950" />

      {/* 頂部總進度條 */}
      <div className="fixed top-0 left-0 z-50 w-full">
        <ProgressBar
          progress={totalProgress}
          colorClass="bg-amber-500"
          heightClass="h-1"
        />
      </div>

      {/* 標題區 */}
      <div className="relative z-10 mt-6 text-center">
        <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-[0.2em] text-zinc-500 uppercase">
          <span className="h-px w-8 bg-zinc-800"></span>
          {recipe.author}
          <span className="h-px w-8 bg-zinc-800"></span>
        </div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-100 drop-shadow-md">
          {t(recipe.nameKey)}
        </h1>
      </div>

      {/* 2. 計時器主體 (環形進度風格) */}
      <div className="relative z-10 flex flex-col items-center justify-center py-4">
        <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-4 border-zinc-800/50 bg-zinc-900/30 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-sm">
          {/* SVG 環形進度條 */}
          <svg
            className="absolute inset-0 h-full w-full -rotate-90 transform"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-zinc-800"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="289"
              strokeDashoffset={289 - (289 * stepProgress) / 100}
              className="text-amber-500 transition-all duration-1000 ease-linear"
              strokeLinecap="round"
            />
          </svg>

          <div className="flex flex-col items-center">
            <span className="mb-2 flex items-center gap-1 text-xs font-medium text-zinc-500">
              <Timer size={12} /> {tCommon("time") || "Time"}
            </span>
            <div className="font-mono text-7xl font-black tracking-tighter text-white tabular-nums drop-shadow-2xl">
              {Math.floor(seconds / 60)}:
              {(seconds % 60).toString().padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* 3. 底部指令卡片 */}
      <div className="relative z-10 mb-4 w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900/60 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl">
        {/* 頂部狀態列 */}
        <div className="bg-white/5 px-7 pt-5 pb-4">
          <StepStatusBar
            stepType={currentStep.type}
            switchStatus={currentStep.switch}
            t={t}
            tCommon={tCommon}
          />
        </div>

        {/* --- 這裡開始是修正後的區域 --- */}
        <div className="p-7 pt-4">
          {/* 左右佈局：左標題，右數據 */}
          <div className="mb-8 flex items-end justify-between gap-4">
            {/* 左側：主指令標題 */}
            <div className="flex-1 pb-1">
              <h3 className="text-4xl leading-tight font-black tracking-tight text-white/90">
                {t(currentStep.noteKey)}
              </h3>
            </div>

            {/* 右側：數據堆疊 */}
            <div className="flex flex-col items-end gap-3">
              {/* 溫度顯示 */}
              <div className="flex items-center gap-2">
                <span className="flex items-center text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                  <Thermometer size={12} />
                </span>
                <div className="flex items-baseline">
                  <span
                    className={`text-2xl font-black tracking-tight tabular-nums transition-all duration-500 ${
                      isWarmWater
                        ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                        : "text-orange-500 drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]"
                    }`}
                  >
                    {displayTemp}
                  </span>
                  <span className="ml-0.5 text-xs font-bold text-zinc-600">
                    °C
                  </span>
                </div>
              </div>

              {/* 水量顯示 */}
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black tracking-tighter text-white tabular-nums">
                    {targetWater}
                  </span>
                  <span className="text-xs font-bold text-zinc-500">g</span>
                </div>
                {/* 水量小進度條 */}
                <div className="h-1 w-16 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${stepProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 按鈕區 */}
          <div className="grid grid-cols-5 gap-3">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`col-span-3 flex items-center justify-center gap-2 rounded-2xl py-4 text-lg font-bold transition-all hover:shadow-lg active:scale-95 ${
                isActive
                  ? "border border-zinc-700 bg-zinc-800 text-zinc-400"
                  : "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              }`}
            >
              {isActive ? (
                <Pause fill="currentColor" size={20} />
              ) : (
                <Play fill="currentColor" size={20} />
              )}
              {isActive ? tCommon("pause") : tCommon("start_brew")}
            </button>
            <button
              onClick={() => router.back()}
              className="col-span-2 flex items-center justify-center rounded-2xl border border-zinc-800 bg-transparent py-4 font-bold text-zinc-500 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white active:scale-95"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        {/* --- 修正區域結束 --- */}
      </div>
    </div>
  );
}
