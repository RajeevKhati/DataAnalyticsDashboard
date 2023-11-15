import { Grid } from "@mui/material";
import CheckAccount from "./CheckAccount";
import Invoices from "./Invoices";
import CashFlow from "./CashFlow";

export default function MainLayout() {
  return (
    <Grid container spacing={4} sx={{ height: "100%" }} className="bye">
      <Grid item xs={6} sx={{ height: "100%" }}>
        <CheckAccount />
      </Grid>
      <Grid item xs={6} sx={{ height: "100%" }}>
        <Invoices />
      </Grid>
      <Grid item xs={6} sx={{ height: "100%" }}>
        <CashFlow />
      </Grid>
      <Grid item xs={6} sx={{ height: "100%" }}></Grid>
    </Grid>
  );
}
