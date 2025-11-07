import TempUnitSelector from "./TempUnitSelector";
import { celsiusToFahrenheit } from "@/lib/utils";
import { TempUnits, CurrentWeatherProps } from "@/types/weatherTypes";


export default function CurrentWeatherContainer({
  tempUnit,
  setTempUnit,
  location,
  currentWeatherData,
}: {
  tempUnit: TempUnits;
  setTempUnit: React.Dispatch<React.SetStateAction<TempUnits>>;
  location: string;
  currentWeatherData: CurrentWeatherProps | undefined;
}) {
  if (currentWeatherData) {
    let currentTemperature = currentWeatherData.currentTemp;
    let description = currentWeatherData.description;
    let todayHigh = currentWeatherData.todayHigh;
    let todayLow = currentWeatherData.todayLow;
    
    if (currentTemperature === null || todayHigh === null || todayLow === null) {
      return (
        <div>
          Temporary
        </div>
      )
    }

    if (tempUnit === TempUnits.Fahrenheit) {
      currentTemperature = celsiusToFahrenheit(currentTemperature);
      todayHigh = celsiusToFahrenheit(todayHigh);
      todayLow = celsiusToFahrenheit(todayLow);
    }

    return (
      <div className="w-11/12 max-w-3xl relative ">
        <div className="text-center text-white">
          <h1 className="text-3xl font-light">{location}</h1>
          <h2 className="text-7xl font-extralight py-2">{currentTemperature}&deg;</h2>
          <p className="text-base">{description}</p>
          <div className="flex text-base justify-center gap-3">
            <p className="">{`H: ${todayHigh}`}&deg;</p>
            <p className="">{`L: ${todayLow}`}&deg;</p>
          </div>
        </div>
        <TempUnitSelector
          tempUnit={tempUnit}
          setTempUnit={setTempUnit}
        />
      </div>
    );
  }

  return (
    <></>
  )
}
