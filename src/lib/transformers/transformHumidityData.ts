import { HumidityProps } from "@/types";
import { CurrentWeatherResponse } from "../schemas/weatherSchemas";


export default function transformHumidityData(data: CurrentWeatherResponse): HumidityProps | null {
  const { 
    relative_humidity_2m: humidity,
    dew_point_2m: dewPoint,
  } = data;

  if (!humidity || !dewPoint) return null

  return {
    humidity: humidity,
    dewPoint: Math.round(dewPoint),
  };
}