import {
  TableBody,
  Paper,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { HeaderTile } from "./HeaderTile";

function createData(account: string, thisMonth: number, ytd: number) {
  return { account, thisMonth, ytd };
}

const rows = [
  createData("Sales", 159, 6.0),
  createData("Advertising", 237, 9.0),
  createData("Inventory", 262, 16.0),
  createData("Entertainment", 305, 3.7),
  createData("Product", 356, 16.0),
];

export default function WatchList() {
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
        <p>Account watchlist</p>
      </HeaderTile>
      <TableContainer style={{ height: "100%" }}>
        <Table sx={{ minWidth: 650, border: "none" }}>
          <TableHead>
            <TableRow>
              <TableCell>Account</TableCell>
              <TableCell align="right">This Month</TableCell>
              <TableCell align="right">YTD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.account}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.account}
                </TableCell>
                <TableCell align="right">{row.thisMonth}</TableCell>
                <TableCell align="right">{row.ytd}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
