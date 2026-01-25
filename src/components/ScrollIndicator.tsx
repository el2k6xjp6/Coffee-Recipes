// src/components/ScrollIndicator.tsx
"use client";

interface Props {
  count: number;
  activeIndex: number;
}

export default function ScrollIndicator({ count, activeIndex }: Props) {
  return (
    <div className="flex justify-center items-center gap-2 h-2 mt-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`transition-all duration-500 rounded-full ${
            i === activeIndex 
              ? "w-8 bg-zinc-900 h-1.5" // 當前頁面：變長
              : "w-1.5 bg-zinc-200 h-1.5" // 非當前：小圓點
          }`}
        />
      ))}
    </div>
  );
}