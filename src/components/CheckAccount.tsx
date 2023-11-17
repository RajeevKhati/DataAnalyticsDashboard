import { Box, Paper, SelectChangeEvent } from "@mui/material";
import React, { useRef, useEffect } from "react";
import { select, scaleLinear, axisBottom, line, curveCardinal } from "d3";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { HeaderTile } from "./HeaderTile";
import { Dropdown } from "./Dropdown";
import { theme } from "../utils/theme";

const data = [0, 25, 35, 15, 100];

export default function CheckAccount() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(containerRef);

  const [account, setAccount] = React.useState("");
  const [month, setMonth] = React.useState("");

  const handleChangeAccount = (event: SelectChangeEvent) => {
    setAccount(event.target.value);
  };
  const handleChangeMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

  useEffect(() => {
    if (svgRef.current && dimensions) {
      const svg = select(svgRef.current);
      const xScale = scaleLinear()
        .domain([0, data.length - 1])
        .range([0, dimensions.width]);

      const yScale = scaleLinear()
        .domain([0, 100])
        .range([dimensions.height, 0]);

      const xAxis = axisBottom(xScale).ticks(data.length);

      svg
        .select<SVGSVGElement>(".x-axis")
        .style("transform", `translateY(${dimensions.height}px)`)
        .call(xAxis);

      const myLine = line()
        .x((_, index) => xScale(index))
        .y((_, index) => yScale(data[index]))
        .curve(curveCardinal);

      svg
        .selectAll(".line")
        .data([data])
        .join("path")
        .attr("class", "line")
        .attr("d", (d: unknown) => myLine(d as [number, number][]))
        .attr("fill", "none")
        .attr("stroke", theme.palette.primary.main)
        .attr("stroke-width", 2);
    }
  }, [dimensions]);

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
          <p>Checking Account</p>
          <div style={{ display: "flex", width: "50%", gap: "8px" }}>
            <Dropdown
              label="Accounts"
              labelId="account-id"
              items={[
                { label: "account1", value: "account1" },
                { label: "account2", value: "account2" },
                { label: "account3", value: "account3" },
              ]}
              onChange={handleChangeAccount}
              value={account}
            />
            <Dropdown
              label="Months"
              labelId="month-id"
              items={[
                { label: "January", value: "january" },
                { label: "February", value: "february" },
                { label: "March", value: "march" },
              ]}
              onChange={handleChangeMonth}
              value={month}
            />
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
