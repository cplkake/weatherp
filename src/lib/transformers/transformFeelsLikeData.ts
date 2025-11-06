import { FeelsLikeProps } from "@/types";
import { CurrentWeatherResponse } from "../schemas/weatherSchemas";

export default function transformFeelsLikeData(data: CurrentWeatherResponse): FeelsLikeProps | null {
  const { 
    temperature_2m: actual,
    apparent_temperature: feelsLike,
    relative_humidity_2m: humidity,
    wind_speed_10m: windSpeed 
  } = data;

  if (!actual || !feelsLike) {
    return null;
  }
  
  return {
    temperature: Math.round(feelsLike),
    description: getFeelsLikeDescription({ actual, feelsLike, humidity, windSpeed }),
  }
}

function getFeelsLikeDescription({
  actual,
  feelsLike,
  humidity,
  windSpeed,
} : {
  actual: number,
  feelsLike: number,
  humidity: number | null,
  windSpeed: number | undefined,
}) {
  const tempDiff = feelsLike - actual;

  if (tempDiff >= 1.5) {
    if (humidity && humidity > 60) return "It feels hotter because of the humidity, so stay hydrated!"
    return "It feels hotter than it really is."
  }
  if (tempDiff <= 1.5) {
    if (windSpeed && windSpeed > 10) return "It feels colder due to the wind."
    return "It feels colder than the actual temperature"
  }

  return "It feels about the same as the actual temperature.";
}