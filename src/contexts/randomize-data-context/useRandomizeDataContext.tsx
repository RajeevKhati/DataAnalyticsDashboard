import React from "react";
import { RandomizeDataContext } from "./RandomizeDataContext";

export const useRandomizeDataContext = () => {
  const context = React.useContext(RandomizeDataContext);
  if (!context) {
    throw new Error(
      "useRandomizeDataContext must be used within a RandomizeDataProvider"
    );
  }
  return context;
};
