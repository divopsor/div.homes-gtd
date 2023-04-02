import { css } from "@emotion/react";
import { ReactNode } from "react";
import { Stack } from "./Stack";

interface ListItemProps {
  className?: string;
  key?: string;
  left: ReactNode;
  right: ReactNode;
}

export function ListItem({ className, left, right }: ListItemProps) {
  return (
    <li
      className={className}
      css={css`
        border-radius: 6px;
      `}
    >
      <Stack.Horizontal>
        {left}
        {right}
      </Stack.Horizontal>
    </li>
  );
}
