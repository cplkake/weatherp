import SearchBar from "@/components/searchBar";
import CurrentWeatherContainer from "@/components/currentWeatherContainer";
import HourlyWeatherContainer from "@/components/hourlyWeatherContainer";
import DailyWeatherContainer from "@/components/dailyWeatherContainer";
import AirQualityContainer from "@/components/airQualityContainer";
import FeelsLikeContainer from "@/components/feelsLikeContainer";
import HumidityContainer from "@/components/humidityContainer";
import { 
  UIReadyData,
  TempUnits,
  Location,
  ResultsType
} from "@/lib/types";
import ApiCreditsContainer from "./apiCreditsContainer";
import useSuggestionsSearch from "@/hooks/useSuggestionsSearch";

export default function WeatherApp({
  uiData,
  targetLocation,
  dataRetrievalError,
  userInput,
  tempUnit,
  setTempUnit,
  setIsPaletteOpen,
  setSearchSuggestions,
}: {
  uiData: UIReadyData,
  targetLocation: Location,
  dataRetrievalError: Error | undefined,
  userInput: string,
  tempUnit: TempUnits,
  setTempUnit: React.Dispatch<React.SetStateAction<TempUnits>>,
  setIsPaletteOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchSuggestions: React.Dispatch<React.SetStateAction<ResultsType[]>>
}) {
  const {
    backgroundColorData,
    currentWeatherData,
    dailyWeatherData,
    hourlyWeatherData,
    airQualityData,
    feelsLikeData,
    humidityData,
  } = uiData
  const borderColor = dataRetrievalError ? 'border border-red-600' : '';
  
  // renders an error message on the top of the screen if an error is thrown upon retrieval of data
  function displayErrorMessage() {
    if (dataRetrievalError) {
      return (
        <div className="absolute bg-red-600 text-white text-sm -top-0 rounded-b-md px-2">
          Error. Please try again
        </div>
      )
    }
  }
  
  useSuggestionsSearch(userInput, setSearchSuggestions);

  return (
    <div
      className="inset-0 fixed overflow-hidden"
      style={{
        background: `linear-gradient(to top, #${backgroundColorData.BOTTOM}, #${backgroundColorData.MIDDLE} 40%, #${backgroundColorData.TOP})`
      }}
    >
      <main
        className={`flex flex-col gap-y-16 items-center py-16 overflow-auto max-h-screen ${borderColor}`}
      >
        {displayErrorMessage()}
        <SearchBar displayText={userInput} setIsPaletteOpen={setIsPaletteOpen} />
        <CurrentWeatherContainer
          tempUnit={tempUnit}
          setTempUnit={setTempUnit}
          location={targetLocation.name}
          currentWeatherData={currentWeatherData}
        />
        <div 
          className="w-11/12 max-w-3xl flex flex-col gap-y-3"
        >
          <HourlyWeatherContainer
            hourlyWeatherData={hourlyWeatherData}
          />
          <DailyWeatherContainer
            dailyWeatherData={dailyWeatherData}
          />
          <AirQualityContainer
            airQualityData={airQualityData}
          />
          <div className="grid grid-cols-2 grid-rows-1 gap-x-3">
            <FeelsLikeContainer
              feelsLikeData={feelsLikeData}
            />
            <HumidityContainer
              humidityData={humidityData}
            />
          </div>
          <ApiCreditsContainer 
            targetLocation={targetLocation}
          />
        </div>
      </main>
    </div>
  )
}
