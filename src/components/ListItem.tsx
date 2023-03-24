import { ReactNode } from "react";
import { Stack } from "./Stack";

interface ListItemProps {
  key?: string;
  left: ReactNode;
  right: ReactNode;
}

export function ListItem({ left, right }: ListItemProps) {
  return (
    <li>
      <Stack.Horizontal>
        {left}
        {right}
      </Stack.Horizontal>
    </li>
  );
}
