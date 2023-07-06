import {
  kelvinToCelsius,
  kelvintoFahrenheit,
} from "@/lib/utils";

export default function FeelsLikeContainer({
  tempUnit,
  currentTemp,
  feelsLikeData,
}: {
  // TODO: use an enum here
  //  Also I think we can direclty pass converted temperature to remove a bit of logic from component
  tempUnit: "C" | "F";
  currentTemp: number;
  feelsLikeData: number;
}) {
  // TODO: We should hide the implementation that determines wich message to show so we have a dummy component
  //  If our component is not aware of business logic it will be more flexible
  //  Also by extracting business logic you will be able to unit test it
  let message = "";

  if (feelsLikeData === currentTemp) message = "Similar to the actual temperature.";
  else if (feelsLikeData > currentTemp) message = "Humidity is making it feel warmer.";
  else message = "Wind is making it feel colder.";

  return (
    <div className="w-full mx-auto rounded-2xl p-3 sm:px-4 backdrop-blur-md bg-gray-500/10 shadow-md">
      <h2 className="text-xs text-white/50 pb-0.5">FEELS LIKE</h2>
      <div className="text-white">
        <h3 className="text-2xl font-light mb-6">{tempUnit === "C" ? kelvinToCelsius(feelsLikeData) : kelvintoFahrenheit(feelsLikeData)}&deg;</h3>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  )
}