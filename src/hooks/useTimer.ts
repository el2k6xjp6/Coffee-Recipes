import { useState, useEffect } from "react";

/**
 * useTimer - 控制計時器啟動/暫停與秒數遞增
 * @param active 是否啟動
 * @returns [seconds, setSeconds]
 */
export function useTimer(active: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (active) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [active]);

  const reset = () => setSeconds(0);
  return { seconds, reset };
}
