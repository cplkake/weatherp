import { 
  TempUnits,
  CurrentWeather,
} from "@/lib/types";
import TempUnitSelector from "./tempUnitSelector";


export default function CurrentWeatherContainer({
  tempUnit,
  setTempUnit,
  location,
  currentWeatherData,
}: {
  tempUnit: TempUnits;
  setTempUnit: React.Dispatch<React.SetStateAction<TempUnits>>;
  location: string;
  currentWeatherData: CurrentWeather | undefined;
}) {


  if (currentWeatherData) {
    return (
      <div className="w-11/12 max-w-3xl relative">
        <div className="text-center text-white">
          <h1 className="text-3xl font-light">{location}</h1>
          <h2 className="text-7xl font-extralight py-2">{currentWeatherData.currentTemp}&deg;</h2>
          <p className="text-base">{currentWeatherData.description}</p>
          <div className="flex text-base justify-center gap-3">
            <p className="">{`H: ${currentWeatherData.todayHigh}`}&deg;</p>
            <p className="">{`L: ${currentWeatherData.todayLow}`}&deg;</p>
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
