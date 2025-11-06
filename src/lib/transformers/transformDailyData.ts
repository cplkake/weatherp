import { DailyWeatherProps, DailyWeather } from "@/types";
import { WeatherResponse } from "../schemas/weatherSchemas";
import getCurrentDayIndex from "../utils/getCurrentDayIndex";
import { unixTimeToLocalDay } from "../utils";
import getWeatherMeta from "../utils/getWeatherMeta";

export default function transformDailyData(data: WeatherResponse): DailyWeatherProps {
  // each datapoint needs: max, min, weather_code, time
  const MAX_DAILY_FORECAST_DAYS = 7;
  const { daily } = data;
  const utcOffsetSeconds = data.utc_offset_seconds;
  const dailyData: DailyWeather[] = [];
  
  const startIndex = getCurrentDayIndex(data);

  // daily weather Container to be in unavailable state
  if (!daily || startIndex === null) {
    return { weekTemperature: { low: null, high: null }, dailyData: [] };
  }

  let weeklyHigh: number | null = null;
  let weeklyLow: number | null = null;

  const totalDays = Math.min(
    daily.time.length,
    daily.temperature_2m_min?.length ?? 0,
    daily.temperature_2m_max?.length ?? 0,
    daily.weather_code?.length ?? 0,
  );
  const endIndex = Math.min(startIndex + MAX_DAILY_FORECAST_DAYS, totalDays - startIndex)

  for (let i = startIndex; i < endIndex; i++) {
    const time = daily.time[i];
    const min = daily.temperature_2m_min && typeof daily.temperature_2m_min[i] === 'number'
      ? Math.round(daily.temperature_2m_min[i]!)
      : null;
    const max = daily.temperature_2m_max && typeof daily.temperature_2m_max[i] === 'number'
      ? Math.round(daily.temperature_2m_max[i]!)
      : null;
    const code = daily.weather_code?.[i] ?? -1;
    const weather = getWeatherMeta(code, 1);

    if (typeof min === "number")
      weeklyLow = weeklyLow === null ? min : Math.min(weeklyLow, min);
    if (typeof max === "number")
      weeklyHigh = weeklyHigh === null ? max : Math.max(weeklyHigh, max);
    

    dailyData.push({
      time,
      timeString: i === startIndex ? "Today" : unixTimeToLocalDay(time, utcOffsetSeconds),
      temp: { min, max },
      weather,
    });
  }

  return {
    weekTemperature: {
      low: weeklyLow,
      high: weeklyHigh,
    },
    dailyData
  };
}