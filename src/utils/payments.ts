export const roundAmountToDecimal = (amount: number, decimal: number = 2) => {
  return parseFloat(amount.toFixed(decimal));
};

export const formatAmount = (
  amount: number,
  currencyCode?: string,
  options?: {
    currencySymbol?: "symbol" | "code";
  },
) => {
  const formattedAmount = roundAmountToDecimal(amount);

  const sign = formattedAmount < 0 ? "-" : "";
  const currencySymbol = options?.currencySymbol ?? "code";

  return (
    sign +
    (currencySymbol === "code" ? " " : "") +
    Math.abs(formattedAmount).toLocaleString()
  );
};
