import { Paper, Box } from "@mui/material";
import { useRef, useEffect } from "react";
import { select, axisBottom, scaleBand, stack, max, scaleLinear } from "d3";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { MonthMapper, colors } from "../utils/constants";
import { HeaderTile } from "./HeaderTile";
import { ColorIndicator } from "./ColorIndicator";
import { theme } from "../utils/theme";
import { useRandomizeDataContext } from "../contexts/randomize-data-context/useRandomizeDataContext";

const keys = ["out", "in"];

export default function CashFlow() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(containerRef);
  const { cashFlowData } = useRandomizeDataContext();

  useEffect(() => {
    if (svgRef.current && dimensions) {
      const svg = select(svgRef.current);
      const stackGenerator = stack().keys(keys);
      const layers = stackGenerator(cashFlowData);
      const extent: [number, number] = [
        0,
        max(layers, (layer) => max(layer, (sequence) => sequence[1] || 0)) || 0,
      ];

      const xScale = scaleBand<number>()
        .domain(cashFlowData.map((_d, index) => index + 1))
        .range([0, dimensions.width])
        .padding(0.25)
        .paddingInner(0.87)
        .paddingOuter(0.8)
        .align(0.5);

      const yScale = scaleLinear().domain(extent).range([dimensions.height, 0]);

      const xAxis = axisBottom(xScale).tickFormat((val) => MonthMapper[val]);

      svg
        .select<SVGSVGElement>(".x-axis")
        .attr("transform", `translate(0, ${dimensions.height})`)
        .call(xAxis);

      svg
        .selectAll(".layer")
        .data(layers)
        .join("g")
        .attr("class", "layer")
        .attr("fill", (layer) => colors[layer.key])
        .selectAll("rect")
        .data((layer) => layer)
        .join("rect")
        .attr("x", (_sequence, index) => {
          const xValue = xScale(index + 1);
          return xValue !== undefined ? xValue : 0;
        })
        .attr("width", xScale.bandwidth())
        .attr("y", (sequence) => yScale(sequence[1]))
        .attr(
          "height",
          (sequence) => yScale(sequence[0]) - yScale(sequence[1])
        );
    }
  }, [cashFlowData, dimensions]);

  return (
    <Paper
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
          <p>Total cash flow</p>
          <div style={{ display: "flex", gap: "12px" }}>
            <ColorIndicator color={theme.palette.primary.dark} label="in" />
            <ColorIndicator color={theme.palette.primary.main} label="out" />
          </div>
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
