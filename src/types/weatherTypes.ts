import { backgroundColorValues } from "@/lib/constants/background";

export enum TempUnits {
  Celsius = "C",
  Fahrenheit = "F",
}

export enum PeriodOfDay {
  Night,
  PreSunriseDawn,
  PostSunriseDawn,
  Day,
  PreSunsetDusk,
  PostSunsetDusk,
}

export type Transition = {
  from: keyof typeof backgroundColorValues;
  to: keyof typeof backgroundColorValues;
  range: [number, number];
};

export type TransformedWeatherData = {
  current: CurrentWeatherProps;
  hourly: HourlyWeatherProps;
  daily: DailyWeatherProps;
  aqi: AirQualityProps | null;
  feelsLike: FeelsLikeProps | null;
  humidity: HumidityProps | null;
}

export interface HumidityProps {
  humidity: number;
  dewPoint: number;
}

export interface FeelsLikeProps {
  temperature: number;
  description: string;
}

export type AqiCode = {
  min: number;
  max: number;
  descriptor: string;
  description: string;
};

export interface AirQualityProps {
  overview: string;
  description: string;
  displayValue: number;
}

export interface DailyWeatherProps {
  weekTemperature: {
    low: number | null;
    high: number | null;
  };
  dailyData: Array<DailyWeather>;
}

export type DailyWeather = {
  time: number;
  timeString: string;
  temp: {
    min: number | null;
    max: number | null;
  };
  weather: {
    code: number;
    label: string;  // e.g. "light rain"
    icon: string;         // e.g. "09d"
  };
}

export type CurrentWeatherProps = {
  currentTemp: number | null;
  description: string | null;
  todayHigh: number | null;
  todayLow: number | null;
  time: number;
  sunrise: number | null;
  sunset: number | null;
}

export type HourlyWeatherProps = Array<HourlyWeather | TwilightTime>

export interface HourlyWeather {
  kind: "weather";
  time: number;
  timeString: string;
  temp: number | null;
  weather: {
    code: number;
    label: string;
    icon: string;
  };
}

export interface TwilightTime {
  kind: "twilight";
  time: number;
  timeString: string;
  weather: {
    label: string;
    icon: string;
  };
}

export function isHourlyWeather(
  item: HourlyWeather | TwilightTime
): item is HourlyWeather {
  return item.kind === "weather";
}