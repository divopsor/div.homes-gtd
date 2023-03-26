import { css } from "@emotion/react";
import { ReactNode } from "react";

interface TxtProps {
  className?: string;
  onClick: () => Promise<void> | void;
  children: ReactNode;
}

export function TxtButton({ className, onClick, children }: TxtProps) {
  return (
    <button
      className={className}
      css={css`
        border: unset;
        background: unset;
        word-break: keep-all;
        text-decoration: underline;
        cursor: pointer;
        :hover {
          color: blue;
        }
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
