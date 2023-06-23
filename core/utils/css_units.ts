import { isNumber } from '@core/utils/number';

export function numberToPixels(num: number | string): string {
  if (!isNumber(num)) return num as string;
  
  return `${num}px`
}