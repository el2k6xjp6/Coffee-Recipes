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
  <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
      {stepType === BREW_STEP_TYPES.BLOOM ? t("steps.bloom") : t("steps.pour")}
    </span>
    {switchStatus && (
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${
          switchStatus === "open"
            ? "bg-green-500/10 text-green-500"
            : "bg-orange-500/10 text-orange-500"
        }`}>
        <div
          className={`w-1.5 h-1.5 rounded-full ${switchStatus === "open" ? "bg-green-500" : "bg-orange-500"} animate-pulse`}
        />
        <span className="text-[10px] font-black uppercase tracking-widest">
          {switchStatus === "open"
            ? tCommon("switch_open")
            : tCommon("switch_closed")}
        </span>
      </div>
    )}
  </div>
);
