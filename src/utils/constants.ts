import { theme } from "./theme";

export enum MonthMapper {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export const colors = {
  out: theme.palette.primary.main,
  in: theme.palette.primary.dark,
  lightBlue: "#E8EEFD",
  textGreen: "#80C29B",
} as const;
