import { Paper } from "@mui/material";
import { useRef, useEffect } from "react";
import { select, scaleLinear, axisBottom, line, curveCardinal } from "d3";
import { useResizeObserver } from "../hooks/useResizeObserver";

const data = [0, 25, 35, 15, 100];

export default function CheckAccount() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(containerRef);

  useEffect(() => {
    if (svgRef.current && dimensions) {
      const svg = select(svgRef.current);
      const xCoordinate = scaleLinear()
        .domain([0, data.length - 1])
        .range([0, dimensions.width]);

      const yCoordinate = scaleLinear()
        .domain([0, 100])
        .range([dimensions.height, 0]);

      const xAxis = axisBottom(xCoordinate).ticks(data.length);

      svg
        .select<SVGSVGElement>(".x-axis")
        .style("transform", `translateY(${dimensions.height}px)`)
        .call(xAxis);

      const myLine = line()
        .x((_, index) => xCoordinate(index))
        .y((_, index) => {
          console.log("index", index);
          console.log("_valueY", _);
          return yCoordinate(data[index]);
        })
        .curve(curveCardinal);

      svg
        .selectAll(".line")
        .data([data])
        .join("path")
        .attr("class", "line")
        .attr("d", (d: unknown) => myLine(d as [number, number][]))
        .attr("fill", "none")
        .attr("stroke", "blue");
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
