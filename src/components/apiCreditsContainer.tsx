import { Location } from "@/lib/types"


export default function ApiCreditsContainer({
  targetLocation
}: {
  targetLocation: Location
}) {

  return (
    <div className="text-center mt-2">
      <h2 className="text-white text-sm">{`Weather for ${targetLocation.name}, ${targetLocation.country}`}</h2>
      <p className="text-white/50 text-xs">Powered by <a href="https://openweathermap.org/" className="underline" target="_blank" rel="noreferrer">OpenWeather</a></p>
    </div>
  )
}