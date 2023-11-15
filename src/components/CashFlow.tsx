import { Paper } from "@mui/material";
import { useRef, useEffect } from "react";
import { select, axisBottom, scaleBand, stack, max, scaleLinear } from "d3";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { MonthMapper, colors } from "../utils/constants";

const data = [
  { month: 1, in: 10, out: 20 },
  { month: 2, in: 40, out: 70 },
  { month: 3, in: 80, out: 20 },
  { month: 4, in: 90, out: 10 },
];
const keys = ["in", "out"];

export default function CashFlow() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(containerRef);

  useEffect(() => {
    if (svgRef.current && dimensions) {
      const svg = select(svgRef.current);
      const stackGenerator = stack().keys(keys);
      const layers = stackGenerator(data);
      const extent = [
        0,
        max(layers, (layer) => max(layer, (sequence) => sequence[1])),
      ];

      const xScale = scaleBand<number>()
        .domain(data.map((d) => d.month))
        .range([0, dimensions.width])
        .padding(0.25);

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
        .attr("x", (sequence) => xScale(sequence.data.month))
        .attr("width", xScale.bandwidth())
        .attr("y", (sequence) => yScale(sequence[1]))
        .attr(
          "height",
          (sequence) => yScale(sequence[0]) - yScale(sequence[1])
        );
    }
  }, [dimensions]);

  return (
    <div ref={containerRef} style={{ height: "100%", width: "100%" }}>
      <Paper elevation={2} sx={{ height: "100%", width: "100%" }}>
        <svg style={{ width: "100%", height: "100%" }} ref={svgRef}>
          <g className="x-axis"></g>
          <g className="y-axis"></g>
        </svg>
      </Paper>
    </div>
  );
}
