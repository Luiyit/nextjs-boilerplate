export function isNumber(value: string | number): boolean {
  const num = new Number(value);
  return !isNaN(num.valueOf()) && isFinite(num.valueOf());
}