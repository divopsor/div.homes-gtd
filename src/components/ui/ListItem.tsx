import { css } from "@emotion/react";
import { ReactNode } from "react";
import { Stack } from "./Stack";

interface ListItemProps {
  key?: string;
  left: ReactNode;
  right: ReactNode;
}

export function ListItem({ left, right }: ListItemProps) {
  return (
    <li
      css={css`
        border: 2px solid;
        border-radius: 6px;
        margin-bottom: 6px;
      `}
    >
      <Stack.Horizontal>
        {left}
        {right}
      </Stack.Horizontal>
    </li>
  );
}
