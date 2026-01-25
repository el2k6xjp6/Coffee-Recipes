import React from "react";

interface ProgressBarProps {
  progress: number; // 0~100
  colorClass?: string;
  heightClass?: string;
  className?: string; // 預留一個彈性介面，萬一外部要加 margin
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  colorClass = "bg-orange-500",
  heightClass = "h-1",
  className = "",
}) => (
  // 1. 加入 rounded-full 讓軌道變圓
  // 2. 加入 overflow-hidden 確保內部進度條不會跑出圓角
  <div
    className={`w-full ${heightClass} overflow-hidden rounded-full bg-zinc-800 ${className}`}
  >
    <div
      // 3. 內部也要 rounded-full (雖然有 overflow-hidden，但在某些瀏覽器加了比較保險)
      className={`h-full ${colorClass} rounded-full transition-all duration-1000 ease-linear`}
      style={{ width: `${progress}%` }}
    />
  </div>
);
