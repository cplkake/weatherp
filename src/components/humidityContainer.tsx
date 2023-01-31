import {
  kelvinToCelsius,
  kelvintoFahrenheit,
} from "@/lib/utils";

export default function HumidityContainer({
  tempUnit,
  humidityData, 
  dewPointData
}: {
  tempUnit: "C" | "F";
  humidityData: number;
  dewPointData: number;
}) {
  const dewPoint = tempUnit === "C" ? kelvinToCelsius(dewPointData) : kelvintoFahrenheit(dewPointData)

  return (
    <div className="w-full mx-auto rounded-2xl p-3 sm:px-4 backdrop-blur-md bg-gray-500/10 shadow-md">
      <h2 className="text-xs text-white/50 pb-0.5">HUMIDITY</h2>
      <div className="text-white">
        <h3 className="text-2xl font-light mb-6">{`${humidityData}%`}</h3>
        <p className="text-sm">{`The dew point is ${dewPoint}\xB0 right now.`}</p>
      </div>
    </div>
  )
}