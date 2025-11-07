import InlineIcon from "./InlineIcon";
import { FaWind } from "react-icons/fa6";
import { AirQualityProps } from "@/types";

export default function AirQualityContainer({
  airQualityData
}: {
  airQualityData: AirQualityProps | null | undefined;
}) {

  if (airQualityData === undefined) {
    return (
      <></>
    )
  }
  if (airQualityData === null) {
    return (
      <div className="w-full mx-auto sm:container rounded-2xl p-3 sm:px-4 backdrop-blur-md bg-gray-500/10 shadow-md">
        <div className="text-white/50 italic">Air Quality Data unavailable</div>
      </div>
    )
  }
  
  return (
    <div className="w-full mx-auto sm:container rounded-2xl p-3 sm:px-4 backdrop-blur-md bg-gray-500/10 shadow-md">
      <h2 className="text-xs text-white/50 pb-0.5 flex items-center gap-1">
        <InlineIcon Icon={FaWind} />AIR QUALITY
      </h2>
      <div className="text-white">
        <h3 className="mb-0.5 text-lg">{airQualityData.overview}</h3>
        <p className="text-sm text-white/90 mb-2">{airQualityData.description}</p>
        <input 
          type="range" 
          disabled 
          value={airQualityData.displayValue} 
          min={0}
          max={500}
          className="w-full appearance-none rounded-lg h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-red-900" 
        />
      </div>
    </div>
  )
}