import {
  FullData,
  TempUnits,
  UIReadyHourlyData,
  HourlyData,
  TwilightTime,
  DailyWeather,
} from "@/lib/types";
import {
  kelvinToCelsius, 
  kelvinToFahrenheit,
  unixTimeToLocalTime,
  calculatePrecipitationProbabilityDisplay,
} from "@/lib/utils/index";

export default function useHourlyWeather(
  retrievedData: FullData | undefined,
  tempUnit: TempUnits
): Array<UIReadyHourlyData> | undefined{
  if (retrievedData) {
    const hourlyData = retrievedData.weather.hourly.slice(0, 25);
    const dailyData = retrievedData.weather.daily;
    const timeZoneOffset: number = retrievedData.weather.timezone_offset;
    
    const hourlyDataWithTwilight = loadRelevantTwilightTimes(hourlyData, dailyData);
    const uiReadyHourlyData = transformHourlyWeatherData(hourlyDataWithTwilight, timeZoneOffset, tempUnit);
  
    return uiReadyHourlyData;
  }
}

function transformHourlyWeatherData(
  hourlyData: Array<HourlyData>,
  timeZoneOffset: number,
  tempUnit: TempUnits
): Array<UIReadyHourlyData> {
  const transformedHourlyData = hourlyData.map((dataPoint, index) => {
    const timeString = index === 0 ? "NOW" : unixTimeToLocalTime(dataPoint.dt + timeZoneOffset);
    const [weather] = dataPoint.weather;

    if ('temp' in dataPoint && 'pop' in dataPoint && 'id' in weather) {
      const temp = tempUnit === 'C' ? kelvinToCelsius(dataPoint.temp) : kelvinToFahrenheit(dataPoint.temp);
      const pop = calculatePrecipitationProbabilityDisplay(dataPoint.pop, weather.id)

      return {
        dt: dataPoint.dt,
        timeString: timeString,
        weather,
        temp,
        pop,
      };
    }

    return {
      dt: dataPoint.dt,
      timeString: timeString,
      weather,
    };
  })

  return transformedHourlyData;
}

function loadRelevantTwilightTimes(
  hourlyData: Array<HourlyData>,
  dailyData: Array<DailyWeather>
): Array<HourlyData> {
  const relevantTwilightTimes = getRelevantTwilightTimes(hourlyData, dailyData);
  
  const hourlyDataWithTwilight: Array<HourlyData> = hourlyData
  .concat(relevantTwilightTimes)
  .sort((a, b) => a.dt - b.dt);
  
  return hourlyDataWithTwilight
}

function getRelevantTwilightTimes(
  hourlyData: Array<HourlyData>,
  dailyData: Array<DailyWeather>
  ) {
  const [todayData, tomorrowData] = dailyData;
  const upcomingTwilightTimes: Array<TwilightTime> = [
    {
      dt: todayData.sunrise,
      weather: [{
        description: 'Sunrise',
        icon: 'sunrise',
      }],
    },
    {
      dt: todayData.sunset,
      weather: [{
        description: 'Sunset',
        icon: 'sunset',
      }],
    },
    {
      dt: tomorrowData.sunrise,
      weather: [{
        description: 'Sunrise',
        icon: 'sunrise',
      }],
    },
    {
      dt: tomorrowData.sunset,
      weather: [{
        description: 'Sunset',
        icon: 'sunset',
      }],
    },
  ];

  const relevantTwilightTimes = upcomingTwilightTimes
  .filter(
    (time) => (time.dt > hourlyData[0].dt) && (time.dt < hourlyData[hourlyData.length - 1].dt)
  );

  return relevantTwilightTimes;
}