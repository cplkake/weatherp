import {
  FullData,
  TempUnits,
  UITextDisplay,
} from "@/lib/types";
import {
  kelvinToCelsius, 
  kelvinToFahrenheit,
} from "@/lib/utils/index";

export default function useHumidity(
  retrievedData: FullData | undefined,
  tempUnit: TempUnits
): UITextDisplay | undefined {
  if (retrievedData) {
    const currentWeatherData = retrievedData.weather.current;
    const humidity = currentWeatherData.humidity;
    const dewPoint = currentWeatherData.dew_point;

    const convertedDewPoint = tempUnit === TempUnits.Celsius ? kelvinToCelsius(dewPoint) : kelvinToFahrenheit(dewPoint);
    const humidityString = `${humidity}%`;
    const dewPointString = `The dew point is ${convertedDewPoint}\xB0 right now.`;

    return {
      overview: humidityString,
      description: dewPointString,
    }
  }
}