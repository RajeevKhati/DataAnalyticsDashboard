import { CashFlowDataType } from "./types";

export function randomizeArray(): number[] {
  const minLength = 4;
  const maxLength = Math.floor(Math.random() * (11 - minLength)) + minLength;
  const maxValue = 400;
  const randomArray: number[] = [];

  for (let i = 0; i < maxLength; i++) {
    const randomValue = Math.floor(Math.random() * (maxValue + 1));
    randomArray.push(randomValue);
  }

  return randomArray;
}

export function getInvoiceScale(arr: unknown[], index: number): string {
  const arrayLength = arr.length;

  if (index === 0) {
    return "older";
  } else if (index === arrayLength - 1) {
    return "future";
  } else if (index > 0 && index < arrayLength) {
    const formattedStartDate = index;
    const formattedEndDate = index + 1;

    return `Jan ${formattedStartDate}-${formattedEndDate}`;
  }
  return "";
}

export function generateCashFlowData(): CashFlowDataType[] {
  const arrayLength = Math.floor(Math.random() * 8) + 5; // Random length between 5 and 12
  const dataArray: CashFlowDataType[] = [];

  for (let i = 0; i < arrayLength; i++) {
    const inValue = Math.floor(Math.random() * 101); // Random in value between 0 and 100
    const outValue = Math.floor(Math.random() * 101); // Random out value between 0 and 100

    const dataObject: CashFlowDataType = {
      in: inValue,
      out: outValue,
    };

    dataArray.push(dataObject);
  }

  return dataArray;
}
