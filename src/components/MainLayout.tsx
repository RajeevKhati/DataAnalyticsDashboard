import { Grid } from "@mui/material";
import CheckAccount from "./CheckAccount";

export default function MainLayout() {
  return (
    <Grid container spacing={4} sx={{ height: "100%" }}>
      <Grid item xs={6}>
        <CheckAccount />
      </Grid>
      <Grid item xs={6}>
        hello
      </Grid>
      <Grid item xs={6}>
        bello
      </Grid>
      <Grid item xs={6}>
        bye
      </Grid>
    </Grid>
  );
}
