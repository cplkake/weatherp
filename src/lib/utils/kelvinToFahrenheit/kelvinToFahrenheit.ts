
export default function kelvinToFahrenheit(temp: number): number {
  return Math.round(((temp - 273.15) * 9) / 5 + 32);
};
