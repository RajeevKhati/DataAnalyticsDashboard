interface ColorIndicatorProps {
  color: string;
  label: string;
}

export const ColorIndicator = ({ color, label }: ColorIndicatorProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "14px",
          height: "14px",
          backgroundColor: color,
          borderRadius: "2px",
          marginRight: "5px",
        }}
      />
      <span style={{ marginBottom: "3px" }}>{label}</span>
    </div>
  );
};
