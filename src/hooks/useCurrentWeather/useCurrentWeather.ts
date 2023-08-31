import {
  FullData,
  TempUnits,
  CurrentWeather,
} from "@/lib/types";
import {
  kelvinToCelsius, 
  kelvinToFahrenheit,
  capitalizeWords,
} from "@/lib/utils/index";

export default function useCurrentWeather(
  retrievedData: FullData | undefined,
  tempUnit: TempUnits
): CurrentWeather | undefined {
  if (retrievedData) {
    const currentWeatherData = retrievedData.weather.current;
    const [currentWeatherSummary] = currentWeatherData.weather;
    const todayTemperatureRange = retrievedData.weather.daily[0].temp;

    let currentTemperature: number = currentWeatherData.temp;
    let description: string = capitalizeWords(currentWeatherSummary.description);
    let todayHigh: number = todayTemperatureRange.max;
    let todayLow: number = todayTemperatureRange.min;

    if (tempUnit === TempUnits.Celsius) {
      currentTemperature = kelvinToCelsius(currentTemperature);
      todayHigh = kelvinToCelsius(todayHigh);
      todayLow = kelvinToCelsius(todayLow);
    } else {
      currentTemperature = kelvinToFahrenheit(currentTemperature);
      todayHigh = kelvinToFahrenheit(todayHigh);
      todayLow = kelvinToFahrenheit(todayLow);
    }

    return {
      currentTemp: currentTemperature,
      description,
      todayHigh,
      todayLow,
    }
  }
}