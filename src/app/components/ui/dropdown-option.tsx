import { useState, HTMLAttributes } from 'react';

function useHover() {
  const [isHover, setIsHover] = useState<boolean>(false);

  const hoverProps: HTMLAttributes<HTMLElement> = {
    onMouseEnter: () => setIsHover(true),
    onMouseLeave: () => setIsHover(false),
  };

  return [isHover, hoverProps] as const;
}

export function HoverComponent() {
  const [isHover, hoverProps] = useHover();

  return (
    <div {...hoverProps} className={`card ${isHover ? 'active' : ''}`}>
      <p>Hover tracking made easy.</p>
    </div>
  );
}
