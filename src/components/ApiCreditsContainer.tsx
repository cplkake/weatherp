import { LocationSuggestion } from "@/lib/schemas/geocodingSchema"


export default function ApiCreditsContainer({
  targetLocation
}: {
  targetLocation: LocationSuggestion
}) {

  return (
    <div className="text-center mt-2">
      <h2 className="text-white text-sm">{`Weather for ${targetLocation.name}, ${targetLocation.country}`}</h2>
      <p className="text-white/50 text-xs">Powered by <a href="https://open-meteo.com/" className="underline" target="_blank" rel="noreferrer">Open-Meteo</a></p>
    </div>
  )
}