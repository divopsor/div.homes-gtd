import { css } from "@emotion/react";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  width?: number;
}

export const Container = ({
  className,
  children,
  width = 720,
}: ContainerProps) => {
  return (
    <div
      className={className}
      css={css`
        margin: 0 auto;
        width: ${width}px;
      `}
    >
      {children}
    </div>
  );
};
