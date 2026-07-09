"use client";

import { useEffect, useRef, useState } from "react";

const THUMB_WIDTH = 6;
const MIN_THUMB_HEIGHT = 32;

export function CustomScrollbar() {
  const [thumb, setThumb] = useState({ top: 0, height: 0, visible: false });
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const draggingRef = useRef(false);
  const dragOffsetRef = useRef(0);

  useEffect(() => {
    const scroller = document.scrollingElement || document.documentElement;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = scroller;

      if (scrollHeight <= clientHeight) {
        setThumb({ top: 0, height: 0, visible: false });
        return;
      }

      const height = Math.max(
        (clientHeight / scrollHeight) * clientHeight,
        MIN_THUMB_HEIGHT
      );
      const maxTop = clientHeight - height;
      const scrollRatio = scrollTop / (scrollHeight - clientHeight);
      const top = scrollRatio * maxTop;

      setThumb({ top, height, visible: true });
      setAtTop(scrollTop <= 0);
      setAtBottom(Math.ceil(scrollTop + clientHeight) >= scrollHeight);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("load", update);

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("load", update);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const scroller = document.scrollingElement || document.documentElement;

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const { scrollHeight, clientHeight } = scroller;
      const trackHeight = clientHeight;
      const thumbHeight = Math.max(
        (clientHeight / scrollHeight) * clientHeight,
        MIN_THUMB_HEIGHT
      );
      const maxTop = trackHeight - thumbHeight;
      const newTop = Math.min(
        Math.max(e.clientY - dragOffsetRef.current, 0),
        maxTop
      );
      const ratio = maxTop === 0 ? 0 : newTop / maxTop;
      scroller.scrollTop = ratio * (scrollHeight - clientHeight);
    };

    const onPointerUp = () => {
      draggingRef.current = false;
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  if (!thumb.visible) return null;

  const handleThumbPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    dragOffsetRef.current = e.clientY - thumb.top;
    document.body.style.userSelect = "none";
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    const scroller = document.scrollingElement || document.documentElement;
    const { scrollHeight, clientHeight } = scroller;
    const trackRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const ratio = clickY / trackRect.height;
    scroller.scrollTop = ratio * (scrollHeight - clientHeight);
  };

  return (
    <div
      onClick={handleTrackClick}
      className="fixed inset-y-0 right-0 z-90"
      style={{ width: THUMB_WIDTH }}
    >
      <div
        data-cursor-expand
        onPointerDown={handleThumbPointerDown}
        className="absolute right-0"
        style={{
          top: thumb.top,
          height: thumb.height,
          width: THUMB_WIDTH,
          backgroundColor: "var(--theme-primary)",
          borderTopLeftRadius: atTop ? 0 : THUMB_WIDTH,
          borderTopRightRadius: atTop ? 0 : THUMB_WIDTH,
          borderBottomLeftRadius: atBottom ? 0 : THUMB_WIDTH,
          borderBottomRightRadius: atBottom ? 0 : THUMB_WIDTH,
        }}
      />
    </div>
  );
}