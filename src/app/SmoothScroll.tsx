"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import React from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis root options={{ lerp: 0.12, duration: 1.0, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;