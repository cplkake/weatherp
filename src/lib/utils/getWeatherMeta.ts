import { WeatherCodes } from "../constants/weatherCodes";

export default function getWeatherMeta(code: number, isDay: 0 | 1) {
  const match = WeatherCodes.find(w => w.code === code);
  const suffix = isDay ? "d" : "n";

  return match
    ? { code, label: match.label, icon: `${match.icon}${suffix}` }
    : { code, label: "Unknown", icon: `unknown_weather_${suffix}.svg` };
}