import React from "react";
import {
  CashFlowDataType,
  CheckingAccountDataType,
  InvoicesDataType,
} from "../../utils/types";

export interface RandomizeDataContextProps {
  randomizeCheckingAccountData: () => void;
  randomizeInvoiceData: () => void;
  randomizeCashFlowData: () => void;
  checkingAccountData: CheckingAccountDataType;
  invoiceData: InvoicesDataType;
  cashFlowData: CashFlowDataType[];
  randomizeAllData: () => void;
}

export const RandomizeDataContext = React.createContext<
  RandomizeDataContextProps | undefined
>(undefined);
