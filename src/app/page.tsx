import { headers } from "next/headers";
import WeatherApp from "@/components/WeatherApp";
import { getClientIp } from "@/lib/utils";
import fetchWeather from "@/lib/api/fetchWeather";
import fetchLocationFromIp from "@/lib/api/fetchLocationFromIp";
import { DEFAULT_LOCATION } from "@/lib/constants/defaults";
import Footer from "@/components/Footer";

export const metadata = {
  title: "weatherp",
  description: "An open-source weather app built with Next.js 15"
}

export default async function Page() {
  const headerList = await headers();
  const clientIp = await getClientIp(headerList);

  const location = (await fetchLocationFromIp(clientIp) || DEFAULT_LOCATION)

  const weather = await fetchWeather({
    lat: location.latitude,
    lon: location.longitude,
    timezone: location.timezone,
  })
  // console.log("🔁 Server-side page.tsx executing:", new Date().toLocaleTimeString());

  return(
    <div 
      className="inset-0 fixed flex flex-col"
    >
      <WeatherApp
        initialLocation={location}
        initialWeather={weather}
      />
      <Footer />
    </div>
  )
}