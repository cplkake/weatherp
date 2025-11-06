import { apiFetch } from "./client"
import { getBaseUrl } from "../utils/getBaseUrl"
import { TransformedWeatherData } from "@/types/weatherTypes"

export default async function fetchWeather({
  lat,
  lon,
  timezone,
}: { 
  lat: number,
  lon: number ,
  timezone: string,
}) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/weather?lat=${lat}&lon=${lon}&timezone=${timezone}`
  const data = await apiFetch<TransformedWeatherData>(url)   // next revalidate?

  return data
}