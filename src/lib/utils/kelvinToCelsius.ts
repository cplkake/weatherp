
export default function kelvinToCelsius(temp: number): number {
  const ABSOLUTE_ZERO_DIFFERENCE = 273.15;

  return Math.round(temp - ABSOLUTE_ZERO_DIFFERENCE);
};
