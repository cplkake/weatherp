import { WeatherResponse } from "../schemas/weatherSchemas";
import { HourlyWeatherProps } from "@/types";
import unixTimeToLocalTime from "@/lib/utils/unixTimeToLocalTime";
import getWeatherMeta from "../utils/getWeatherMeta";


export default function transformHourlyData(
  data: WeatherResponse
): HourlyWeatherProps {
  const { current, hourly, daily } = data;

  if (!hourly?.time?.length || !hourly.temperature_2m || !hourly.weather_code) {
    return [];
  }

  const { time: hourlyTimes, temperature_2m, weather_code } = hourly;
  const currentTime = current.time;
  const utc_offset = data.utc_offset_seconds;
  const hourlyWeatherData: HourlyWeatherProps = [];

  // Find the index of the first hour after the current time
  let startIndex = hourlyTimes.findIndex(t => t > currentTime);
  if (startIndex === -1) startIndex = 0;

  let isDay = current.is_day;
  
  // if we get sunrise and sunset arrays
  if (Array.isArray(data.daily?.sunrise) && Array.isArray(data.daily?.sunset)) {
    const sunriseTimes = (data.daily?.sunrise ?? []).filter(
      (t): t is number => typeof t === "number"
    );
    const sunsetTimes = (data.daily?.sunset ?? []).filter(
      (t): t is number => typeof t === "number"
    );
    let nextSunriseIndex = sunriseTimes.findIndex(time => time > currentTime);
    let nextSunsetIndex = sunsetTimes.findIndex(time => time > currentTime);
    
    let nextSunrise = sunriseTimes[nextSunriseIndex];
    let nextSunset = sunsetTimes[nextSunsetIndex];
    if (nextSunrise && nextSunset) {
      // if the next event to occur is a sunset: currently in daytime
      isDay = nextSunset < nextSunrise ? 1 : 0;
    } else if (!nextSunrise && nextSunset) {
      // no future sunrise (e.g., polar night) but a sunset: assume currently day until then
      isDay = 1;
    } else if (nextSunrise && !nextSunset) {
      // no future sunset (e.g., polar day): assume currently night until next sunrise
      isDay = 0;
    }

    // Start with the current weather as the first item
    hourlyWeatherData.push({
      time: currentTime,
      timeString: "Now",
      temp: typeof current.temperature_2m === "number" ? Math.round(current.temperature_2m) : null,
      weather: getWeatherMeta(current.weather_code, isDay),
      kind: "weather",
    });

    // Next 24 hours
    hourlyTimes
      .slice(startIndex, startIndex + 24)
      .forEach((t, i) => {
        nextSunrise = sunriseTimes[nextSunriseIndex];
        nextSunset = sunsetTimes[nextSunsetIndex];
        // check if the next entry should be a twilight entry
        if (isDay && t > nextSunset) {
          // add a sunset entry
          hourlyWeatherData.push({
            time: nextSunset,
            timeString: unixTimeToLocalTime(nextSunset, utc_offset),
            weather: { label: "Sunset", icon: "sunset" },
            kind: "twilight",
          });
          nextSunsetIndex++;
          isDay = 0;
        } else if (!isDay && t > sunriseTimes[nextSunriseIndex]) {
          // add a sunrise entry
          hourlyWeatherData.push({
            time: nextSunrise,
            timeString: unixTimeToLocalTime(nextSunrise, utc_offset),
            weather: { label: "Sunrise", icon: "sunrise" },
            kind: "twilight",
          });
          nextSunriseIndex++;
          isDay = 1;
        }
        hourlyWeatherData.push({
          time: t,
          timeString: unixTimeToLocalTime(t, utc_offset),
          temp: typeof temperature_2m[startIndex + i] === "number" ? Math.round(temperature_2m[startIndex + i]!) : null,
          weather: getWeatherMeta(weather_code[startIndex + i] ?? -1, isDay),
          kind: "weather",
        });
      });
  } else {
    // Start with the current weather as the first item
    hourlyWeatherData.push({
      time: currentTime,
      timeString: "Now",
      temp: typeof current.temperature_2m === "number" ? Math.round(current.temperature_2m) : null,
      weather: getWeatherMeta(current.weather_code, isDay),
      kind: "weather",
    });
  
    hourlyTimes
      .slice(startIndex, startIndex + 24)
      .forEach((t, i) => {
        // without reference to sunrise or sunset
        hourlyWeatherData.push({
          time: t,
          timeString: unixTimeToLocalTime(t, utc_offset),
          temp: typeof temperature_2m[startIndex + i] === "number" ? Math.round(temperature_2m[startIndex + i]!) : null,
          weather: getWeatherMeta(weather_code[startIndex + i] ?? -1, isDay),
          kind: "weather",
        });
      });
  }
  return hourlyWeatherData;
}