import { TransformedWeatherData } from "@/types/weatherTypes";
import { WeatherResponse } from "../schemas/weatherSchemas";
import { getWeatherDescription } from "../constants/weatherMappings";
import transformHourlyData from "./transformHourlyData";
import transformDailyData from "./transformDailyData";
import transformAqiData from "./transformAqiData";
import transformFeelsLikeData from "./transformFeelsLikeData";
import transformHumidityData from "./transformHumidityData";
import getCurrentDayIndex from "../utils/getCurrentDayIndex";
import { AirQualityResponse } from "../schemas/airQualitySchema";


export default function transformWeatherData(data: WeatherResponse, rawAqiData: AirQualityResponse): TransformedWeatherData {
  const dailyIndex = getCurrentDayIndex(data);
  
  const currentTemp = typeof data.current.temperature_2m === 'number'
    ? Math.round(data.current.temperature_2m)
    : null;

  const todayHigh =
    data.daily?.temperature_2m_max &&
    dailyIndex !== null &&
    dailyIndex >= 0 &&
    dailyIndex < data.daily.temperature_2m_max.length &&
    typeof data.daily.temperature_2m_max[dailyIndex] === 'number'
      ? Math.round(data.daily.temperature_2m_max[dailyIndex]!)
      : null;
  
  const todayLow =
    data.daily?.temperature_2m_min &&
    dailyIndex !== null &&
    dailyIndex >= 0 &&
    dailyIndex < data.daily.temperature_2m_min.length &&
    typeof data.daily.temperature_2m_min[dailyIndex] === 'number'
      ? Math.round(data.daily.temperature_2m_min[dailyIndex]!)
      : null;

  const sunrise =
    data.daily?.sunrise &&
    dailyIndex !== null &&
    dailyIndex >= 0 &&
    dailyIndex < data.daily.sunrise.length &&
    typeof data.daily.sunrise[dailyIndex] === 'number'
      ? Math.round(data.daily.sunrise[dailyIndex]!)
      : null;

  const sunset =
    data.daily?.sunset &&
    dailyIndex !== null &&
    dailyIndex >= 0 &&
    dailyIndex < data.daily.sunset.length &&
    typeof data.daily.sunset[dailyIndex] === 'number'
      ? Math.round(data.daily.sunset[dailyIndex]!)
      : null;

  const description = getWeatherDescription(data.current.weather_code);
  
  const hourlyData = transformHourlyData(data);
  const dailyData = transformDailyData(data);
  const aqiData = transformAqiData(rawAqiData);
  const feelsLikeData = transformFeelsLikeData(data.current);
  const humidityData = transformHumidityData(data.current);

  return {
    current: {
      currentTemp,
      todayHigh,
      todayLow,
      description,
      time: data.current.time,
      sunrise,
      sunset,
    },
    hourly: hourlyData,
    daily: dailyData,
    aqi: aqiData,
    feelsLike: feelsLikeData,
    humidity: humidityData,
  }
}