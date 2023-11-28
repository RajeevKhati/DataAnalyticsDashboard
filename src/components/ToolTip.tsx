import { colors } from "../utils/constants";

export interface TooltipProps {
  x: number;
  y: number;
  data: number;
}

export const ToolTip = ({ x, y, data }: TooltipProps) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        backgroundColor: colors.textBlackLight,
        padding: "4px",
        borderRadius: "2px",
      }}
    >
      {data}
    </div>
  );
};
