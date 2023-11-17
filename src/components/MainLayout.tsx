import CheckAccount from "./CheckAccount";
import Invoices from "./Invoices";
import CashFlow from "./CashFlow";
import WatchList from "./WatchList";

export default function MainLayout() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 20,
      }}
    >
      <CheckAccount />
      <Invoices />
      <CashFlow />
      <WatchList />
    </div>
  );
}
