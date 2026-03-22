/**
 * Formats a raw numeric string into BRL currency format: R$ 0,00
 * Digits enter from the right, shifting left as you type.
 * Example: type "1" → R$ 0,01, type "10" → R$ 0,10, type "100" → R$ 1,00
 */
export const formatBRLInput = (raw: string): string => {
  const nums = raw.replace(/\D/g, "");
  const val = (parseInt(nums) || 0) / 100;
  return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

/**
 * Parses a BRL formatted string back to a number.
 * Handles "R$ 1.234,56" → 1234.56
 */
export const parseBRLInput = (formatted: string): number => {
  const clean = formatted.replace(/[^\d,]/g, "");
  if (!clean) return 0;
  const parts = clean.split(",");
  const intPart = parts[0].replace(/\./g, "");
  const decPart = parts[1] || "0";
  return parseFloat(`${intPart}.${decPart}`) || 0;
};

/**
 * Handle onChange for BRL input fields.
 * Returns the formatted string to set as the input value.
 */
export const handleBRLChange = (inputValue: string): string => {
  const nums = inputValue.replace(/\D/g, "");
  return formatBRLInput(nums);
};
