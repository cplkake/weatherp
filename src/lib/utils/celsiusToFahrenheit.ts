export default function celsiusToFahrenheit(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}