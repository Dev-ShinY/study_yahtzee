"use Client";
import clsx from "clsx";
import { useState } from "react";

export const Tooltip = ({
  tooltip,
  children,
}: {
  tooltip: string;
  children: JSX.Element | string;
}) => {
  const [onHover, setOnHover] = useState(false);
  return (
    <div>
      <div
        onClick={() => setOnHover(!onHover)}
        onMouseOver={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        className={clsx("cursor-pointer", "relative")}
      >
        {children}
        <div
          className={clsx(
            "hidden",
            onHover && "!block",
            "bg-white",
            "rounded-lg",
            "border",
            "border-gray-100",
            "py-3",
            "px-2",
            "absolute",
            "bottom-[120%]",
            "bg-gray-400",
            "text-white"
          )}
        >
          {tooltip}
        </div>
      </div>
    </div>
  );
};
