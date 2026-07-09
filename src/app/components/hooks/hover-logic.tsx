import { useState } from "react";

export function HoverLogic() {
    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{ padding: '20px', border: '1px solid black' }}
        >
            <p>The element is {isHover ? 'HOVERED 🔥' : 'not hovered 😴'}</p>
            {isHover && <p>This extra text only shows on hover!</p>}
        </div>
    )
}