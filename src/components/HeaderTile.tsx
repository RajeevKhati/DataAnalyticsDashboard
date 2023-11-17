import { Box } from "@mui/material";
import React from "react";

interface HeaderTileProps {
  children: React.ReactNode;
}

export const HeaderTile = ({ children }: HeaderTileProps) => {
  return (
    <Box
      sx={{
        borderBottom: "2px solid",
        borderColor: "background.paper",
        display: "flex",
        alignItems: "center",
        px:"10px"
      }}
    >
      {children}
    </Box>
  );
};
