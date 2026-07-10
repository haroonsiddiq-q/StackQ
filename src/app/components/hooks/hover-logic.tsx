import { useState, HTMLAttributes } from "react";

export function useHover() {
  const [isHover, setIsHover] = useState<boolean>(false);

  const hoverProps: HTMLAttributes<HTMLElement> = {
    onMouseEnter: () => setIsHover(true),
    onMouseLeave: () => setIsHover(false),
  };

  return [isHover, hoverProps] as const;
}