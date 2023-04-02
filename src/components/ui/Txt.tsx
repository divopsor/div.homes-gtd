import { css } from "@emotion/react";
import { ReactNode } from "react";

interface TxtProps {
  className?: string;
  children: ReactNode;
}

export function Txt({ className, children }: TxtProps) {
  return (
    <p
      className={className}
      css={css`
        width: 100%;
        font-size: 1.6rem;
        word-break: keep-all;
        white-space: pre-line;
      `}
      dangerouslySetInnerHTML={{ __html: `${children}` }}
    />
  );
}
