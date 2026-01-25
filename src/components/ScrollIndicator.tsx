"use client";

interface Props {
  count: number;
  activeIndex: number;
}

export default function ScrollIndicator({ count, activeIndex }: Props) {
  return (
    // 修改 1: mt-8 改成 mt-4 (往上移)
    <div className="mt-4 flex h-2 items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-500 ${
            i === activeIndex
              ? "h-1.5 w-6 bg-amber-500" // 修改 2: 啟用狀態改為琥珀色 (原本是黑色)
              : "h-1.5 w-1.5 bg-zinc-700" // 修改 3: 未啟用改為深灰色 (原本是淺灰)
          }`}
        />
      ))}
    </div>
  );
}