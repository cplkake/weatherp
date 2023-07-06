import {
  kelvinToCelsius,
  kelvintoFahrenheit,
  capitalizeWords,
} from "@/lib/utils";
import TempUnitSelector from "./tempUnitSelector";

// TODO: I think an enum would be wiser as it's a set of values
type TempUnits = "C" | "F";

// TODO: Maybe we could pass a Weather object to reduce parameters
//  It would encapsulate kelvinToCelsius or kelvintoFahrenheit in getTodayHigh() for example
//  By doing this you remove logic from your component and rely only on your object getter
export default function CurrentWeatherContainer({
  tempUnit,
  setTempUnit,
  location,
  currentTemp,
  description,
  todayHigh,
  todayLow,
}: {
  tempUnit: TempUnits;
  setTempUnit: React.Dispatch<React.SetStateAction<TempUnits>>;
  location: string;
  currentTemp: number;
  description: string;
  todayHigh: number;
  todayLow: number;
}) {
  if (tempUnit === "C") {
    currentTemp = kelvinToCelsius(currentTemp);
    todayHigh = kelvinToCelsius(todayHigh);
    todayLow = kelvinToCelsius(todayLow);
  } else {
    currentTemp = kelvintoFahrenheit(currentTemp);
    todayHigh = kelvintoFahrenheit(todayHigh);
    todayLow = kelvintoFahrenheit(todayLow);
  }

  return (
    <div className="w-11/12 max-w-3xl relative">
      <div className="text-center text-white">
        <h1 className="text-3xl font-light">{location}</h1>
        <h2 className="text-7xl font-extralight py-2">{currentTemp}&deg;</h2>
        <p className="text-base">{capitalizeWords(description)}</p>
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
