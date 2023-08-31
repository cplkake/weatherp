import {
  FullData,
  TempUnits,
  UITextDisplay,
} from "@/lib/types";
import {
  kelvinToCelsius, 
  kelvinToFahrenheit,
} from "@/lib/utils/index";

export default function useFeelsLike(
  retrievedData: FullData | undefined,
  tempUnit: TempUnits
): UITextDisplay | undefined {
  if (retrievedData) {
    const currentWeatherData = retrievedData.weather.current;
    const feelsLikeTemperature = currentWeatherData.feels_like;
    const currentTemperature = currentWeatherData.temp;
    
    const convertedFeelsLikeTemperature = tempUnit === TempUnits.Celsius ? kelvinToCelsius(feelsLikeTemperature) : kelvinToFahrenheit(feelsLikeTemperature);
    const convertedCurrentTemperature = tempUnit === TempUnits.Celsius ? kelvinToCelsius(currentTemperature) : kelvinToFahrenheit(currentTemperature);
    let message = "";
  
    if (convertedFeelsLikeTemperature === convertedCurrentTemperature) message = "Similar to the actual temperature.";
    else if (convertedFeelsLikeTemperature > convertedCurrentTemperature) message = "Humidity is making it feel warmer.";
    else message = "Wind is making it feel colder.";
  
    return {
      overview: convertedFeelsLikeTemperature.toString(),
      description: message,
    }
  }
}