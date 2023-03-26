import { css } from "@emotion/react";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  width: number;
}

export const Container = ({ children, width }: ContainerProps) => {
  return (
    <div
      css={css`
        margin: 0 auto;
        width: ${width}px;
      `}
    >
      {children}
    </div>
  );
};
