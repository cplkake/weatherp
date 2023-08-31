import {
  FullData,
  TempUnits,
} from "@/lib/types";
import useCurrentWeather from "../useCurrentWeather/useCurrentWeather";
import useDailyWeatherData from "../useDailyWeather/useDailyWeather";
import useHourlyWeather from "../useHourlyWeather/useHourlyWeather";
import useAirQuality from "../useAirQuality/useAirQuality";
import useFeelsLike from "../useFeelsLike/useFeelsLike";
import useHumidity from "../useHumidity/useHumidity";
import useBackgroundColour from "../useBackgroundColour/useBackgroundColour";


export default function useRetrievedData(
  retrievedData: FullData | undefined,
  tempUnit: TempUnits,
) {
  const backgroundColorData = useBackgroundColour(retrievedData);
  const currentWeatherData = useCurrentWeather(retrievedData, tempUnit);
  const dailyWeatherData = useDailyWeatherData(retrievedData, tempUnit);
  const hourlyWeatherData = useHourlyWeather(retrievedData, tempUnit);
  const airQualityData = useAirQuality(retrievedData)
  const feelsLikeData = useFeelsLike(retrievedData, tempUnit);
  const humidityData  = useHumidity(retrievedData, tempUnit);

  return {
    backgroundColorData,
    currentWeatherData,
    dailyWeatherData,
    hourlyWeatherData,
    airQualityData,
    feelsLikeData,
    humidityData,
  }
}
