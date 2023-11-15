import { Paper } from "@mui/material";
import { useRef, useEffect } from "react";
import { select, scaleLinear, axisBottom, max, scaleBand } from "d3";
import { useResizeObserver } from "../hooks/useResizeObserver";

const data = [1, 25, 35, 15, 100];

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
