import { theme } from "./theme";

export enum MonthMapper {
  Jan = 1,
  Feb,
  March,
  April,
  May,
  June,
  July,
  Aug,
  Sept,
  Oct,
  Nov,
  Dec,
}

export const colors: { [key: string]: string } = {
  out: theme.palette.primary.main,
  in: theme.palette.primary.dark,
  lightBlue: "#E8EEFD",
  textGreen: "#80C29B",
  textBlackLight:"#00000055"
} as const;
