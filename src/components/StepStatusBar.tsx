import React from "react";
import { BREW_STEP_TYPES } from "@/constants/recipes";

interface StepStatusBarProps {
  stepType: string;
  switchStatus?: string;
  t: (key: string) => string;
  tCommon: (key: string) => string;
}

export const StepStatusBar: React.FC<StepStatusBarProps> = ({
  stepType,
  switchStatus,
  t,
  tCommon,
}) => (
  <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
    <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
      {stepType === BREW_STEP_TYPES.BLOOM ? t("steps.bloom") : t("steps.pour")}
    </span>
    {switchStatus && (
      <div
        className={`flex items-center gap-2 rounded-full px-3 py-1 transition-all ${
          switchStatus === "open"
            ? "bg-green-500/10 text-green-500"
            : "bg-orange-500/10 text-orange-500"
        }`}
      >
        <div
          className={`h-1.5 w-1.5 rounded-full ${switchStatus === "open" ? "bg-green-500" : "bg-orange-500"} animate-pulse`}
        />
        <span className="text-[10px] font-black tracking-widest uppercase">
          {switchStatus === "open"
            ? tCommon("switch_open")
            : tCommon("switch_closed")}
        </span>
      </div>
    )}
  </div>
);
