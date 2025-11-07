'use client'

import useSWR from "swr"
import { useState, useMemo, useEffect } from 'react'
import fetchWeather from "@/lib/api/fetchWeather"
import { LocationSuggestion } from "@/lib/schemas/geocodingSchema"
import { useBackgroundColour } from "@/hooks/useBackgroundColour"
import SearchWeather from "./SearchWeather"
import CurrentWeatherContainer from "./CurrentWeatherContainer"
import HourlyWeatherContainer from "./HourlyWeatherContainer"
import DailyWeatherContainer from "./DailyWeatherContainer"
import AirQualityContainer from "./AirQualityContainer"
import FeelsLikeContainer from "./FeelsLikeContainer"
import HumidityContainer from "./HumidityContainer"
import ApiCreditsContainer from "./ApiCreditsContainer"
import { TransformedWeatherData, TempUnits } from "@/types/weatherTypes"

// TODO: put somewhere else
type WeatherFetcherKey = readonly [number, number, string]

const swrFetcher = ([lat, lon, timezone]: WeatherFetcherKey) => {
  return fetchWeather({lat, lon, timezone})
}

export default function WeatherApp({
  initialLocation,
  initialWeather
}: {
  initialLocation: LocationSuggestion,
  initialWeather: TransformedWeatherData,
}) {
  const [location, setLocation] = useState(initialLocation);
  const [tempUnit, setTempUnit] = useState<TempUnits>(TempUnits.Celsius);
  
  const key = useMemo(() => [location.latitude, location.longitude, location.timezone] as const, [
    location.latitude,
    location.longitude,
    location.timezone,
  ]);
  const { data: weather, isLoading } = useSWR(
    key,
    async () => {
      return swrFetcher(key)
    },
    {
      fallbackData: initialWeather,
      // refreshInterval: 3600000,
      revalidateOnFocus: true,
      // dedupingInterval: 60000,
    }
  )
    
  const background = useBackgroundColour(weather);

  const handleLocationSelect = (newLocation: LocationSuggestion) => {
    setLocation(newLocation)
  }

  // useEffect(() => {
  //   console.log("💧 WeatherApp mounted at", new Date().toLocaleTimeString());
  // }, []);
  

  return isLoading ? (
    <div 
      className="inset-0 fixed overflow-hidden flex items-center justify-center"
      style={{
        background: `linear-gradient(to top, #${background.BOTTOM}, #${background.MIDDLE} 40%, #${background.TOP})`
      }}
    >
      <svg aria-hidden="true" className="w-8 h-8 mr-2 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="rgb(0 0 0 / 0.2)"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white"/>
      </svg>
    </div>
  ) : (
    <div 
      className="inset-0 fixed flex flex-col min-h-screen "
      style={{
        background: `linear-gradient(to bottom, ${background.TOP} 0%, ${background.MIDDLE} 60%, ${background.BOTTOM} 100%)`,
        transition: "background 1s ease",
      }}
    >
      <div
        className="flex flex-col gap-y-12 items-center py-16 overflow-auto max-h-screen"
      >
        <SearchWeather
          onSelectLocation={handleLocationSelect}
        />
        <CurrentWeatherContainer
          location={location.name}
          currentWeatherData={weather.current}
          tempUnit={tempUnit}
          setTempUnit={setTempUnit}
        />
        <div className="w-11/12 max-w-3xl flex flex-col gap-y-3 pb-32 sm:pb-10">
          <HourlyWeatherContainer
            hourlyWeatherData={weather.hourly}
            tempUnit={tempUnit}
          />
          <DailyWeatherContainer
            dailyWeatherData={weather.daily}
            tempUnit={tempUnit}
          />
          <AirQualityContainer
            airQualityData={weather.aqi}
          />
          <div className="grid grid-cols-2 grid-rows-1 gap-x-3">
            <FeelsLikeContainer
              feelsLikeData={weather.feelsLike}
              tempUnit={tempUnit}
            />
            <HumidityContainer
              humidityData={weather.humidity}
              tempUnit={tempUnit}
            />
          </div>
          <ApiCreditsContainer
            targetLocation={location}
          />
        </div>
      </div>

    </div>
  )
}