import { UITextDisplay } from "@/lib/types";

export default function HumidityContainer({
  humidityData,
}: {
  humidityData: UITextDisplay | undefined,
}) {

  if (humidityData) {
    return (
      <div className="w-full mx-auto rounded-2xl p-3 sm:px-4 backdrop-blur-md bg-gray-500/10 shadow-md">
        <h2 className="text-xs text-white/50 pb-0.5">HUMIDITY</h2>
        <div className="text-white">
          <h3 className="text-2xl font-light mb-6">{humidityData.overview}</h3>
          <p className="text-sm">{humidityData.description}</p>
        </div>
      </div>
    )
  }

  return (
    <></>
  )
}