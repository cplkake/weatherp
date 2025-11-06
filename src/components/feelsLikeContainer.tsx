import { celsiusToFahrenheit } from "@/lib/utils"
import InlineIcon from "./InlineIcon";
import { FaTemperatureHalf } from "react-icons/fa6";
import { TempUnits } from "@/types"
import { FeelsLikeProps } from "@/types"

export default function FeelsLikeContainer({
  feelsLikeData,
  tempUnit,
}: {
  feelsLikeData: FeelsLikeProps | undefined | null,
  tempUnit: TempUnits,
}) {
  
  if (feelsLikeData) {
    const feelsLikeTemperature = tempUnit === TempUnits.Celsius ? feelsLikeData.temperature : celsiusToFahrenheit(feelsLikeData.temperature);

    return (
      <div className="w-full mx-auto rounded-2xl p-3 sm:px-4 backdrop-blur-md bg-gray-500/10 shadow-md">
        <h2 className="text-xs text-white/50 pb-0.5 flex items-center gap-1">
        <InlineIcon Icon={FaTemperatureHalf} />FEELS LIKE
        </h2>
        <div className="text-white">
          <h3 className="text-2xl font-light mb-6">{feelsLikeTemperature}&deg;</h3>
          <p className="text-sm">{feelsLikeData.description}</p>
        </div>
      </div>
    )
  }

  if (feelsLikeData === null) {
    return (
      <div className="w-full mx-auto sm:container rounded-2xl p-3 sm:px-4 backdrop-blur-md bg-gray-500/10 shadow-md">
        <div className="text-white/50 italic">Feel Like Data unavailable</div>
      </div>
    )
  }

  return (
    <></>
  )
}