import {
  FullData,
  TempUnits,
  DailyWeatherOverview,
  DailyWeather,
  UIReadyDailyData,
  TemperatureRange
} from "@/lib/types";
import {
  kelvinToCelsius, 
  kelvinToFahrenheit,
  unixTimeToLocalDay,
  calculatePrecipitationProbabilityDisplay,
} from "@/lib/utils/index";

export default function useDailyWeatherData(
  retrievedData: FullData | undefined,
  tempUnit: TempUnits
): DailyWeatherOverview | undefined {
  if (retrievedData) {
    const timeZoneOffset: number = retrievedData.weather.timezone_offset;
    const dailyData: Array<DailyWeather> = retrievedData.weather.daily

    let uiReadyDailyData: Array<UIReadyDailyData> | undefined;
    let weekTemperatureRange: TemperatureRange;

    uiReadyDailyData = transformDailyWeatherData(dailyData, timeZoneOffset, tempUnit);
    weekTemperatureRange = calculateWeekTemperatureRange(uiReadyDailyData);

    return {
      weekTemperature: weekTemperatureRange,
      dailyData: uiReadyDailyData,
    }
  }
}

function transformDailyWeatherData(
  dailyData: Array<DailyWeather>,
  timeZoneOffset: number,
  tempUnit: TempUnits
): Array<UIReadyDailyData> {
  const transformedDailyData: Array<UIReadyDailyData> = dailyData.map((dataPoint, index) => {
    const timeString = index === 0 ? "Today" : unixTimeToLocalDay(dataPoint.dt + timeZoneOffset);
    const [adjustedWeather] = dataPoint.weather;
    const tempMin = tempUnit === 'C' ? kelvinToCelsius(dataPoint.temp.min) : kelvinToFahrenheit(dataPoint.temp.min);
    const tempMax = tempUnit === 'C' ? kelvinToCelsius(dataPoint.temp.max) : kelvinToFahrenheit(dataPoint.temp.max);
    const pop = calculatePrecipitationProbabilityDisplay(dataPoint.pop, adjustedWeather.id)


    return {
      dt: dataPoint.dt,
      timeString,
      weather: adjustedWeather,
      pop,
      temp: {
        min: tempMin,
        max: tempMax,
      },
    };
  })
  
  return transformedDailyData;
}

function calculateWeekTemperatureRange(
  dailyData: Array<UIReadyDailyData>
): TemperatureRange {
  const [firstDayData] = dailyData;
  const firstDayHigh = firstDayData.temp.max;
  const firstDayLow = firstDayData.temp.min;
  
  const weekLowTemperature = dailyData.reduce(
    (lowest, current) => Math.min(lowest, current.temp.min),
    firstDayLow
  );
  const weekHighTemperature = dailyData.reduce(
    (highest, current) => Math.max(highest, current.temp.max),
    firstDayHigh
  );

  return {
    low: weekLowTemperature,
    high: weekHighTemperature,
  }
}