import React, { useState } from "react";
import {
  CashFlowDataType,
  CheckingAccountDataType,
  InvoicesDataType,
} from "../../utils/types";
import {
  RandomizeDataContext,
  RandomizeDataContextProps,
} from "./RandomizeDataContext";
import { generateCashFlowData, randomizeArray } from "../../utils/utils";

interface RandomizeDataProviderProps {
  children: React.ReactNode;
}

export const RandomizeDataProvider = ({
  children,
}: RandomizeDataProviderProps) => {
  const [checkingAccountData, setCheckingAccountData] =
    useState<CheckingAccountDataType>(randomizeArray());
  const [invoiceData, setInvoiceData] = useState<InvoicesDataType>(
    randomizeArray()
  );
  const [cashFlowData, setCashFlowData] = useState<CashFlowDataType[]>(
    generateCashFlowData()
  );

  const randomizeCheckingAccountData = () => {
    const data = randomizeArray();
    setCheckingAccountData(data);
  };
  const randomizeInvoiceData = () => {
    const data = randomizeArray();
    setInvoiceData(data);
  };
  const randomizeCashFlowData = () => {
    const data = generateCashFlowData();
    setCashFlowData(data);
  };

  const randomizeAllData = () => {
    randomizeCheckingAccountData();
    randomizeInvoiceData();
    randomizeCashFlowData();
  };

  const contextValue: RandomizeDataContextProps = {
    checkingAccountData,
    invoiceData,
    cashFlowData,
    randomizeCheckingAccountData,
    randomizeInvoiceData,
    randomizeCashFlowData,
    randomizeAllData,
  };

  return (
    <RandomizeDataContext.Provider value={contextValue}>
      {children}
    </RandomizeDataContext.Provider>
  );
};
