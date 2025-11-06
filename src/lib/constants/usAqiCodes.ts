import { AqiCode } from "@/types";

export const USAQICodes = [
  {
    min: 0,
    max: 50,
    descriptor: "Good",
    description: "Air quality is considered satisfactory, and air pollution poses little or no risk."
  },
  {
    min: 51,
    max: 100,
    descriptor: "Moderate",
    description: "Air quality is acceptable; some pollutants may pose a moderate health concern for sensitive people."
  },
  {
    min: 101,
    max: 150,
    descriptor: "Unhealthy for sensitive groups",
    description: "Members of sensitive groups may experience health effects. General public less likely to be affected."
  },
  {
    min: 151,
    max: 200,
    descriptor: "Unhealthy",
    description: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious effects."
  },
  {
    min: 201,
    max: 300,
    descriptor: "Very Unhealthy",
    description: "Health alert: everyone may experience more serious health effects."
  },
  {
    min: 301,
    max: 500,
    descriptor: "Hazardous",
    description: "Health warnings of emergency conditions. The entire population is more likely to be affected."
  }
] as const satisfies readonly AqiCode[];

export function getUsAqiDescriptor(aqi: number): string {
  const match = USAQICodes.find(code => aqi >= code.min && aqi <= code.max);
  return match?.descriptor ?? "Unknown";
}

export function getUsAqiDescription(aqi: number): string {
  const match = USAQICodes.find(code => aqi >= code.min && aqi <= code.max);
  return match?.description ?? "Data unavailable";
}