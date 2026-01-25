import React from "react";

interface ProgressBarProps {
  progress: number; // 0~100
  colorClass?: string;
  heightClass?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  colorClass = "bg-orange-500",
  heightClass = "h-1",
}) => (
  <div className={`w-full ${heightClass} bg-zinc-800`}>
    <div
      className={`h-full ${colorClass} transition-all duration-1000 ease-linear`}
      style={{ width: `${progress}%` }}
    />
  </div>
);
