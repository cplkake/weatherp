import { WeatherResponse } from "@/lib/schemas/weatherSchemas";

// Utility to generate a sequence of timestamps spaced 1 day apart.
function generateDailyTimestamps(start: number, days = 9): number[] {
  const oneDay = 86400; // seconds in a day
  return Array.from({ length: days }, (_, i) => start + i * oneDay);
}

// Default (clear daytime) mock dataset
export const mockWeatherResponseClearDay: WeatherResponse = {
  latitude: 40.7128,
  longitude: -74.0060,
  utc_offset_seconds: -18000,
  current: {
    time: 1760982300,
    temperature_2m: 13.9,
    is_day: 1,
    weather_code: 0,
    apparent_temperature: 10.1,
    relative_humidity_2m: 41,
    wind_speed_10m: 10.9,
    dew_point_2m: 6.5,
  },
  hourly: {
    time: Array.from({ length: 24 }, (_, i) => 1760932800 + i * 3600),
    temperature_2m: Array(24).fill(14).map((t, i) => t - Math.abs(12 - i) * 0.2),
    weather_code: Array(24).fill(0),
  },
  daily: (() => {
    const days = 9;
    const baseMin = 7.1;
    const baseMax = 14.1;

    const time = generateDailyTimestamps(1760932800, days);
    const sunrise = generateDailyTimestamps(1760960319, days).map(t => t + 21600); // +6h
    const sunset = generateDailyTimestamps(1760999154, days).map(t => t + 64800);  // +18h
    const temperature_2m_max = Array.from({ length: days }, (_, i) => baseMax + i);
    const temperature_2m_min = Array.from({ length: days }, (_, i) => baseMin + i);
    const weather_code = Array(9).fill(0);

    return {
      time,
      sunrise,
      sunset,
      temperature_2m_max,
      temperature_2m_min,
      weather_code,
    }
  })(),
};

//Rainy day dataset
export const mockWeatherResponseRainy: WeatherResponse = {
  ...mockWeatherResponseClearDay,
  current: {
    ...mockWeatherResponseClearDay.current,
    weather_code: 61, // drizzle/rain
    temperature_2m: 11.3,
    is_day: 1,
  },
  hourly: {
    ...mockWeatherResponseClearDay.hourly,
    weather_code: Array(24).fill(61),
  },
  daily: {
    ...mockWeatherResponseClearDay.daily,
    weather_code: Array(9).fill(61),
  } as WeatherResponse["daily"]
  ,
};

 // Nighttime dataset
export const mockWeatherResponseNight: WeatherResponse = {
  ...mockWeatherResponseClearDay,
  current: {
    ...mockWeatherResponseClearDay.current,
    is_day: 0,
    temperature_2m: 7.5,
    weather_code: 2, // partly cloudy night
  },
};

// Snowy dataset
export const mockWeatherResponseSnowy: WeatherResponse = {
  ...mockWeatherResponseClearDay,
  current: {
    ...mockWeatherResponseClearDay.current,
    temperature_2m: -2.3,
    weather_code: 71, // snow
  },
  daily: {
    ...mockWeatherResponseClearDay.daily,
    weather_code: Array(9).fill(71),
  } as WeatherResponse["daily"],
};

