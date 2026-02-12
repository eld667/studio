
"use client";

import { useState, useEffect } from "react";

export function CountdownTimer() {
  const [timeLeft, setTimeTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target to March 15th, 2025 (as per requirements)
    const targetDate = new Date("2025-03-15T10:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center items-center font-mono">
      {[
        { label: "Days", val: timeLeft.days },
        { label: "Hours", val: timeLeft.hours },
        { label: "Mins", val: timeLeft.minutes },
        { label: "Secs", val: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="bg-[#1E293B] border border-white/10 rounded-xl p-4 md:p-6 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center shadow-xl">
            <span className="text-2xl md:text-4xl font-black text-white">{String(item.val).padStart(2, '0')}</span>
          </div>
          <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 mt-3">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
