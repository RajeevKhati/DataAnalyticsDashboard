import { Box, Button, ButtonProps, Paper, styled } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import { select, scaleLinear, axisBottom, max, scaleBand } from "d3";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { HeaderTile } from "./HeaderTile";
import { colors } from "../utils/constants";
import { theme } from "../utils/theme";
import FileUploadModal from "./FileUploadModal";
import { useRandomizeDataContext } from "../contexts/randomize-data-context/useRandomizeDataContext";
import { getInvoiceScale } from "../utils/utils";
import { ToolTip, TooltipProps } from "./ToolTip";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [tooltipData, setTooltipData] = useState<TooltipProps | null>(null);
  const { invoiceData } = useRandomizeDataContext();

  useEffect(() => {
    if (svgRef.current && dimensions) {
      const svg = select(svgRef.current);
      const xScale = scaleBand<number>()
        .domain(invoiceData.map((_value, index) => index))
        .range([0, dimensions.width])
        .padding(0.5)
        .paddingInner(0.87)
        .paddingOuter(0.8)
        .align(0.5);

      const yScale = scaleLinear()
        .domain([0, max(invoiceData) || 0])
        .range([dimensions.height, 0]);

      const xAxis = axisBottom(xScale)
        .ticks(invoiceData.length)
        .tickFormat((_val, index) => getInvoiceScale(invoiceData, index));

      svg
        .select<SVGSVGElement>(".x-axis")
        .style("transform", `translateY(${dimensions.height}px)`)
        .call(xAxis);

      svg
        .selectAll(".bar")
        .data(invoiceData)
        .join("rect")
        .attr("class", "bar")
        .attr("fill", theme.palette.primary.main)
        .attr("x", (_value, index) => xScale(index) || 0)
        .attr("y", yScale)
        .attr("width", xScale.bandwidth())
        .attr("height", (val) => dimensions.height - yScale(val))
        .attr("rx", 5)
        .attr("ry", 5)
        .on("mouseover", (e, data) => {
          const { x, y } = e;
          console.log("event", e);
          setTooltipData({ x, y, data });
        })
        .on("mouseleave", () => {
          setTooltipData(null);
        });
    }
  }, [dimensions, invoiceData]);

  const handleUpload = (file: File) => {
    // Handle the uploaded file here
    console.log("File uploaded:", file);
  };

  return (
    <>
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
            <p>Invoices owned to you</p>
            <InvoiceButton
              onClick={() => setModalOpen(true)}
              variant="contained"
            >
              New Sales Invoice
            </InvoiceButton>
          </Box>
        </HeaderTile>
        <div ref={containerRef} style={{ height: "100%", width: "100%" }}>
          <svg style={{ width: "100%", height: "100%" }} ref={svgRef}>
            <g className="x-axis"></g>
            <g className="y-axis"></g>
          </svg>
        </div>
      </Paper>
      <FileUploadModal
        open={modalOpen}
        onDialogClose={() => setModalOpen(false)}
        onUpload={handleUpload}
      />
      {tooltipData ? <ToolTip {...tooltipData} /> : null}
    </>
  );
}
