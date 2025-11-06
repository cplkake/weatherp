import { celsiusToFahrenheit } from "@/lib/utils"
import InlineIcon from "./InlineIcon";
import { FaDroplet } from "react-icons/fa6";
import { HumidityProps, TempUnits } from "@/types"

export default function HumidityContainer({
  humidityData,
  tempUnit,
}: {
  humidityData: HumidityProps | undefined | null,
  tempUnit: TempUnits
}) {
  
  if (humidityData) {
    const dewPoint = tempUnit === TempUnits.Celsius ? humidityData.dewPoint : celsiusToFahrenheit(humidityData.dewPoint);

    return (
      <div className="w-full mx-auto rounded-2xl p-3 sm:px-4 backdrop-blur-md bg-gray-500/10 shadow-md">
        <h2 className="text-xs text-white/50 pb-0.5 flex items-center gap-1">
          <InlineIcon Icon={FaDroplet} />HUMIDITY
        </h2>
        <div className="text-white">
          <h3 className="text-2xl font-light mb-6">{humidityData.humidity}%</h3>
          <p className="text-sm">{`The dew point is ${dewPoint}\u00B0 right now.`}</p>
        </div>
      </div>
    )
  }

  if (humidityData === null) {
    return (
      <div className="w-full mx-auto sm:container rounded-2xl p-3 sm:px-4 backdrop-blur-md bg-gray-500/10 shadow-md">
        <div className="text-white/50 italic">Humidity Data unavailable</div>
      </div>
    )
  }

  return (
    <></>
  )
}