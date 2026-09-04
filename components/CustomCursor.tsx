"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.5 });
  const ringY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.5 });

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    }
    function handleDown() {
      setClicking(true);
    }
    function handleUp() {
      setClicking(false);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* precise inner dot, no lag */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 0 : 5,
          height: hovering ? 0 : 5,
          backgroundColor: "#141414",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* trailing ring, inverts to filled on hover */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full border-[1.5px] border-ink"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 44 : 24,
          height: hovering ? 44 : 24,
          backgroundColor: hovering ? "#141414" : "rgba(20,20,20,0)",
          scale: clicking ? 0.85 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}
