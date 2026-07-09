"use client";
import { useEffect, useRef } from "react";

const OFFSET = 14;
const ARM = 6;
const PAD = 2;

interface BracketState {
  x: number; y: number; w: number; h: number;
}

export default function CustomCursor() {
  const animRef = useRef<BracketState>({ x: -200, y: -200, w: OFFSET * 2, h: OFFSET * 2 });
  const targetRef = useRef<BracketState>({ x: -200, y: -200, w: OFFSET * 2, h: OFFSET * 2 });
  const cursorRef = useRef({ x: -200, y: -200 });
  const hoveringRef = useRef(false);
  const hoveredElRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const setLine = (id: string, x1: number, y1: number, x2: number, y2: number) => {
      const el = document.getElementById(id) as SVGLineElement | null;
      if (!el) return;
      el.setAttribute("x1", String(x1));
      el.setAttribute("y1", String(y1));
      el.setAttribute("x2", String(x2));
      el.setAttribute("y2", String(y2));
    };

    const draw = () => {
      if (hoveringRef.current && hoveredElRef.current) {
        const r = hoveredElRef.current.getBoundingClientRect();
        targetRef.current = {
          x: r.left - PAD,
          y: r.top - PAD,
          w: r.width + PAD * 2,
          h: r.height + PAD * 2,
        };
      }

      const sp = hoveringRef.current ? 0.1 : 0.18;
      const a = animRef.current;
      const t = targetRef.current;

      a.x = lerp(a.x, t.x, sp);
      a.y = lerp(a.y, t.y, sp);
      a.w = lerp(a.w, t.w, sp);
      a.h = lerp(a.h, t.h, sp);

      const { x, y, w, h } = a;

      setLine("cc-tl-h", x,     y,     x + ARM,     y          );
      setLine("cc-tl-v", x,     y,     x,           y + ARM    );
      setLine("cc-tr-h", x + w, y,     x + w - ARM, y          );
      setLine("cc-tr-v", x + w, y,     x + w,       y + ARM    );
      setLine("cc-bl-h", x,     y + h, x + ARM,     y + h      );
      setLine("cc-bl-v", x,     y + h, x,           y + h - ARM);
      setLine("cc-br-h", x + w, y + h, x + w - ARM, y + h      );
      setLine("cc-br-v", x + w, y + h, x + w,       y + h - ARM);

      const dot = document.getElementById("cc-dot") as SVGCircleElement | null;
      if (dot) {
        dot.setAttribute("cx", String(cursorRef.current.x));
        dot.setAttribute("cy", String(cursorRef.current.y));
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      if (!hoveringRef.current) {
        targetRef.current = {
          x: e.clientX - OFFSET,
          y: e.clientY - OFFSET,
          w: OFFSET * 2,
          h: OFFSET * 2,
        };
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor-expand]");
      if (!el) return;
      hoveringRef.current = true;
      hoveredElRef.current = el;
    };

    const onMouseOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor-expand]");
      if (!el) return;
      const related = e.relatedTarget as HTMLElement | null;
      if (related && el.contains(related)) return;
      hoveringRef.current = false;
      hoveredElRef.current = null;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <svg
      id="cc-svg"
      className="fixed inset-0 w-screen h-screen pointer-events-none z-9999 overflow-visible"
    >
      {["cc-tl-h","cc-tl-v","cc-tr-h","cc-tr-v",
        "cc-bl-h","cc-bl-v","cc-br-h","cc-br-v"].map(id => (
        <line
          key={id}
          id={id}
          x1="-200" y1="-200" x2="-200" y2="-200"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
        />
      ))}
      <circle id="cc-dot" cx="-200" cy="-200" r="2" fill="currentColor" />
    </svg>
  );
}