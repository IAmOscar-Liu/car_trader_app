import { getValueStr } from "./getValueStr";

export function getValueNumber(value: string | string[]) {
  const str = getValueStr(value);
  const number = parseInt(str);
  return isNaN(number) ? null : number;
}
