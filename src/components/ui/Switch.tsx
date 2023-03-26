import { ReactNode } from "react";

interface SwitchProps<T extends string> {
  cases: Record<T, ReactNode>;
  value: keyof SwitchProps<T>["cases"];
}

export function Switch<T extends string>({
  value,
  cases,
}: SwitchProps<T>) {

  return <>{cases[value] as SwitchProps<T>["cases"][T]}</>;
}
