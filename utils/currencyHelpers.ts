export function parseArgentineCurrency(text: string): number {
  const onlyNumbersAndSeparators = text.replace(/[^\d.,]/g, '');
  const cleanedText = onlyNumbersAndSeparators.replace(/\./g, '').replace(',', '.');
  return Number(cleanedText);
}