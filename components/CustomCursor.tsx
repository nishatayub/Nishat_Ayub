"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CELL = 4;

// body pixels shared by both expressions (7x7 grid)
const BODY: [number, number][] = [
  [2, 0], [3, 0], [4, 0],
  [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
  [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
  [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
  [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4],
  [1, 5], [2, 5], [3, 5], [4, 5], [5, 5],
  [2, 6], [3, 6], [4, 6],
];

function px(col: number, row: number) {
  return { x: col * CELL, y: row * CELL };
}

function PixelBlob({ excited }: { excited: boolean }) {
  const eyeCutouts: [number, number][] = excited
    ? [[1, 1], [1, 2], [5, 1], [5, 2]] // wide-eyed both sides
    : [[1, 2], [5, 1], [5, 2]]; // goofy: one small eye, one big eye
  const mouth: [number, number][] = excited
    ? [[2, 4], [3, 4], [4, 4]]
    : [[2, 4], [3, 4]];

  return (
    <svg viewBox="0 0 28 28" width="28" height="28" shapeRendering="crispEdges">
      {BODY.map(([c, r]) => {
        const { x, y } = px(c, r);
        return <rect key={`b-${c}-${r}`} x={x} y={y} width={CELL} height={CELL} fill="#141414" />;
      })}
      {eyeCutouts.map(([c, r]) => {
        const { x, y } = px(c, r);
        return <rect key={`e-${c}-${r}`} x={x} y={y} width={CELL} height={CELL} fill="#f0ece7" />;
      })}
      {mouth.map(([c, r]) => {
        const { x, y } = px(c, r);
        return <rect key={`m-${c}-${r}`} x={x} y={y} width={CELL} height={CELL} fill="#f0ece7" />;
      })}
    </svg>
  );
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const cx = useSpring(x, { damping: 22, stiffness: 380, mass: 0.4 });
  const cy = useSpring(y, { damping: 22, stiffness: 380, mass: 0.4 });

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
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[999]"
      style={{ x: cx, y: cy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        scale: clicking ? 0.7 : hovering ? 1.35 : 1,
        rotate: hovering ? [0, -8, 8, 0] : 0,
      }}
      transition={{
        scale: { duration: 0.18, ease: "easeOut" },
        rotate: { duration: 0.6, repeat: hovering ? Infinity : 0, ease: "easeInOut" },
      }}
    >
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
          <div style={{ opacity: hovering ? 0 : 1 }}>
            <PixelBlob excited={false} />
          </div>
          <div className="absolute inset-0" style={{ opacity: hovering ? 1 : 0 }}>
            <PixelBlob excited={true} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
