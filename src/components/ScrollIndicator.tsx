// src/components/ScrollIndicator.tsx
"use client";

interface Props {
  count: number;
  activeIndex: number;
}

export default function ScrollIndicator({ count, activeIndex }: Props) {
  return (
    <div className="mt-8 flex h-2 items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-500 ${
            i === activeIndex
              ? "h-1.5 w-8 bg-zinc-900" // 當前頁面：變長
              : "h-1.5 w-1.5 bg-zinc-200" // 非當前：小圓點
          }`}
        />
      ))}
    </div>
  );
}
