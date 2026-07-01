"use client";

import { useMemo, useState } from "react";
import { useTimer } from "@/hooks/useTimer";
import type { Recipe } from "@/types/recipes";
import { ProgressBar } from "./ProgressBar";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Play, Pause, X, RotateCcw } from "lucide-react";
import { BREW_STEP_TYPES, SWITCH_STATUS } from "@/constants/recipes";

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
  const { seconds, reset } = useTimer(isActive);

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

  const totalDuration = recipe.steps[recipe.steps.length - 1].startAt + 30;
  const totalProgress = Math.min((seconds / totalDuration) * 100, 100);

  const displayTemp = currentStep.temp || recipe.temp;
  const isWarmWater = displayTemp <= 85;

  const scale = initialCoffee / recipe.defaultCoffee;
  const targetWater = Math.round(currentStep.targetWater * scale);
  const totalWater = Math.round(recipe.defaultCoffee * recipe.ratio * scale);

  const isDone = seconds >= totalDuration && totalProgress >= 100;

  const handleReset = () => {
    setIsActive(false);
    reset();
  };

  const stepLabel =
    currentStep.type === BREW_STEP_TYPES.BLOOM
      ? t("steps.bloom")
      : currentStep.type === BREW_STEP_TYPES.WAIT
        ? tCommon("time")
        : t("steps.pour");

  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-950 text-white">
      {/* Top total progress bar */}
      <div className="fixed top-0 left-0 z-50 w-full">
        <ProgressBar
          progress={totalProgress}
          colorClass="bg-amber-500"
          heightClass="h-[2px]"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 pt-10 pb-2">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition-colors hover:text-white"
        >
          <X size={18} />
        </button>
        <div className="text-center">
          <p className="text-[10px] font-medium tracking-[0.25em] text-zinc-600 uppercase">
            {recipe.author}
          </p>
          <h1 className="text-sm font-bold text-zinc-200">
            {t(recipe.nameKey)}
          </h1>
        </div>
        {/* Spacer to balance the back button */}
        <div className="w-10" />
      </header>

      {/* Step track */}
      <div className="relative z-10 flex items-center justify-center gap-1.5 px-6 py-5">
        {recipe.steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i < currentStepIndex
                ? "w-4 bg-amber-500"
                : i === currentStepIndex
                  ? "w-7 bg-amber-400"
                  : "w-4 bg-zinc-800"
            }`}
          />
        ))}
      </div>

      {/* Hero section */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-4">
        {/* Step type + switch badges */}
        <div className="mb-5 flex items-center gap-2">
          <span className="rounded-full bg-zinc-800/80 px-4 py-1.5 text-[10px] font-black tracking-widest text-zinc-400 uppercase">
            {stepLabel}
          </span>
          {currentStep.switch && (
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black tracking-widest uppercase transition-all ${
                currentStep.switch === SWITCH_STATUS.OPEN
                  ? "bg-green-500/10 text-green-400"
                  : "bg-orange-500/10 text-orange-400"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 animate-pulse rounded-full ${
                  currentStep.switch === SWITCH_STATUS.OPEN
                    ? "bg-green-400"
                    : "bg-orange-400"
                }`}
              />
              {currentStep.switch === SWITCH_STATUS.OPEN
                ? tCommon("switch_open")
                : tCommon("switch_closed")}
            </span>
          )}
        </div>

        {/* Water target — the hero number */}
        <div className="flex items-end gap-2">
          <span className="text-[6.5rem] leading-none font-black tracking-tighter tabular-nums text-white drop-shadow-2xl">
            {targetWater}
          </span>
          <span className="mb-3 text-2xl font-bold text-zinc-500">g</span>
        </div>

        {/* Water progress track */}
        <div className="mt-3 w-40">
          <div className="h-1 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-300"
              style={{ width: `${(targetWater / totalWater) * 100}%` }}
            />
          </div>
          <p className="mt-1.5 text-center text-[10px] font-medium tabular-nums text-zinc-600">
            of {totalWater}g total
          </p>
        </div>

        {/* Step instruction */}
        <p className="mt-6 text-center text-lg font-semibold text-zinc-400">
          {t(currentStep.noteKey)}
        </p>
      </div>

      {/* Bottom panel */}
      <div className="relative z-10 px-4 pb-8">
        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-900/70 shadow-2xl backdrop-blur-xl">

          {/* Time + Temp */}
          <div className="grid grid-cols-2 divide-x divide-white/5">
            <div className="flex flex-col items-center py-5">
              <span className="mb-1.5 text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                {tCommon("time")}
              </span>
              <span className="font-mono text-3xl font-black tabular-nums text-white">
                {Math.floor(seconds / 60)}:
                {(seconds % 60).toString().padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-col items-center py-5">
              <span className="mb-1.5 text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                {tCommon("temp")}
              </span>
              <span
                className={`text-3xl font-black tabular-nums transition-colors duration-500 ${
                  isWarmWater ? "text-cyan-400" : "text-orange-500"
                }`}
              >
                {displayTemp}°
              </span>
            </div>
          </div>

          {/* Next step preview */}
          {nextStep && !isDone && (
            <div className="flex items-center gap-3 border-t border-white/5 px-5 py-3">
              <span className="text-[10px] font-bold tracking-widest text-zinc-700 uppercase">
                Next
              </span>
              <span className="flex-1 truncate text-sm text-zinc-500">
                {t(nextStep.noteKey)}
              </span>
              <span className="shrink-0 font-mono text-xs tabular-nums text-zinc-600">
                {Math.floor(nextStep.startAt / 60)}:
                {(nextStep.startAt % 60).toString().padStart(2, "0")}
              </span>
            </div>
          )}

          {/* Done banner */}
          {isDone && (
            <div className="border-t border-amber-500/20 bg-amber-500/5 px-5 py-3 text-center text-sm font-bold text-amber-400">
              Enjoy your coffee ☕
            </div>
          )}

          {/* Step progress bar */}
          <div className="px-4 pb-2">
            <ProgressBar
              progress={stepProgress}
              colorClass="bg-amber-500"
              heightClass="h-1"
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-5 gap-2.5 p-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`col-span-3 flex items-center justify-center gap-2.5 rounded-2xl py-4 text-base font-black tracking-wide transition-all active:scale-[0.97] ${
                isActive
                  ? "border border-zinc-700 bg-zinc-800/80 text-zinc-300"
                  : "bg-white text-zinc-950 shadow-[0_0_24px_rgba(255,255,255,0.1)]"
              }`}
            >
              {isActive ? (
                <Pause fill="currentColor" size={18} />
              ) : (
                <Play fill="currentColor" size={18} />
              )}
              {isActive ? tCommon("pause") : tCommon("start_brew")}
            </button>
            <button
              onClick={handleReset}
              className="col-span-1 flex items-center justify-center rounded-2xl border border-zinc-800 text-zinc-500 transition-colors hover:border-zinc-700 hover:text-white active:scale-[0.97]"
            >
              <RotateCcw size={17} />
            </button>
            <button
              onClick={() => router.back()}
              className="col-span-1 flex items-center justify-center rounded-2xl border border-zinc-800 text-zinc-500 transition-colors hover:border-zinc-700 hover:text-white active:scale-[0.97]"
            >
              <X size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
