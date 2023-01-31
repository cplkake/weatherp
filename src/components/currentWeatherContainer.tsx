import {
  kelvinToCelsius,
  kelvintoFahrenheit,
  capitalizeWords,
} from "@/lib/utils";

export default function CurrentWeatherContainer({
  tempUnit,
  location,
  currentTemp,
  description,
  todayHigh,
  todayLow,
}: {
  tempUnit: "C" | "F";
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

  description = capitalizeWords(description);

  return (
    <div className="max-w-3xl text-center text-white">
      <h2 className="text-3xl font-light">{location}</h2>
      <h1 className="text-7xl font-extralight py-2">{currentTemp}&deg;</h1>
      <p className="text-base">{description}</p>
      <div className="flex text-base justify-center gap-3">
        <p className="">{`H: ${todayHigh}`}&deg;</p>
        <p className="">{`L: ${todayLow}`}&deg;</p>
      </div>
    </div>
  );
}
