import { Box, Button, ButtonProps, Paper, styled } from "@mui/material";
import { useRef, useEffect } from "react";
import { select, scaleLinear, axisBottom, max, scaleBand } from "d3";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { HeaderTile } from "./HeaderTile";
import { colors } from "../utils/constants";

const data = [1, 25, 35, 15, 100];

const InvoiceButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: colors.lightBlue,
  color: theme.palette.primary.main,
  fontSize: "0.6rem",
  fontWeight: 700,
  boxShadow: "none",
  padding: "4px 10px",
  letterSpacing: 0.1,
  textTransform: "none",
  "&:hover": {
    backgroundColor: colors.lightBlue,
    boxShadow: "none",
  },
}));

export default function Invoices() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(containerRef);

  useEffect(() => {
    if (svgRef.current && dimensions) {
      const svg = select(svgRef.current);
      const xScale = scaleBand<number>()
        .domain(data.map((_value, index) => index))
        .range([0, dimensions.width])
        .padding(0.5);

      const yScale = scaleLinear()
        .domain([0, max(data) || 0])
        .range([dimensions.height, 0]);

      const xAxis = axisBottom(xScale).ticks(data.length);

      svg
        .select<SVGSVGElement>(".x-axis")
        .style("transform", `translateY(${dimensions.height}px)`)
        .call(xAxis);

      svg
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (_value, index) => xScale(index) || 0)
        .attr("y", yScale)
        .attr("width", xScale.bandwidth())
        .attr("height", (val) => dimensions.height - yScale(val));
    }
  }, [dimensions]);

  return (
    <Paper
      elevation={2}
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "20% 80%",
        backgroundColor: "background.default",
      }}
    >
      <HeaderTile>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p>Invoices owned to you</p>
          <InvoiceButton variant="contained">New Sales Invoice</InvoiceButton>
        </Box>
      </HeaderTile>
      <div ref={containerRef} style={{ height: "100%", width: "100%" }}>
        <svg style={{ width: "100%", height: "100%" }} ref={svgRef}>
          <g className="x-axis"></g>
          <g className="y-axis"></g>
        </svg>
      </div>
    </Paper>
  );
}
