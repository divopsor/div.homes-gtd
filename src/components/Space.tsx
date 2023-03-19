import { css } from "@emotion/react";

export function Spacing({ size }: { size: number }) {
  return (
    <div
      css={css`
        width: 100%;
        height: ${size}px;
      `}
    ></div>
  );
}
