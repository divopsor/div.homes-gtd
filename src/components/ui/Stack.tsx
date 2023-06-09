import { css } from "@emotion/react";
import { ReactNode } from "react";

interface StackProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "space-between";
}

function StackHorizontal({
  children,
  className,
  align = "center",
}: StackProps) {
  return (
    <div
      className={className}
      css={css`
        display: flex;
        justify-content: ${align};
        align-items: center;
      `}
    >
      {children}
    </div>
  );
}

function StackVertical({ children, className, align = "center" }: StackProps) {
  return (
    <div
      className={className}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: ${align === "right"
          ? "end"
          : align === "left"
          ? "start"
          : "center"};
      `}
    >
      {children}
    </div>
  );
}

export const Stack = {
  Horizontal: StackHorizontal,
  Vertical: StackVertical,
};
