import { WeatherResponse } from "../schemas/weatherSchemas";

export default function getCurrentDayIndex(data: WeatherResponse) {
  const currentTime = data.current.time;
  const dailyTimes = data.daily?.time;

  // if the daily times array is undefined or has no values
  if (!dailyTimes || dailyTimes.length === 0) return null;   

  // returns the index of data.daily.time for the current day
  for (let i = 0; i < dailyTimes.length - 1; i++) {
    if (dailyTimes[i] <= currentTime && currentTime < dailyTimes[i + 1]) {
      return i;
    }
  }

  // case where current time is after the last daily time and is still within the same day
  const last = dailyTimes[dailyTimes.length - 1];
  if (currentTime >= last) {
    const oneDayInSeconds = 86400;
    if (currentTime - last < oneDayInSeconds) {
      return dailyTimes.length - 1;
    }
  }

  // currentTime is out of the range of data.daily.time
  return null
}