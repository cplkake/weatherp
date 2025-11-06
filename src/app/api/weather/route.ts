import { NextResponse } from "next/server";
import { WeatherResponseSchema } from "@/lib/schemas/weatherSchemas";
import transformWeatherData from "@/lib/transformers/transformWeatherData";
import { AirQualityResponseSchema } from "@/lib/schemas/airQualitySchema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const timezone = searchParams.get('timezone')

  if (!lat || !lon || !timezone) {
    return NextResponse.json({ error: 'Missing parameter: lat, lon, or timezone' }, { status: 400 })
  };

  // TODO: make this more readable
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?timezone=${timezone}&latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,weather_code&current=is_day,temperature_2m,weather_code,apparent_temperature,relative_humidity_2m,wind_speed_10m,dew_point_2m&timeformat=unixtime`
  const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`;
  
  try {
    const [weatherRes, aqiRes] = await Promise.allSettled([
      fetch(weatherUrl, { next: { revalidate: 3600 } }),
      fetch(aqiUrl, { next: { revalidate: 1800 } }),
    ])

    if (weatherRes.status !== 'fulfilled' || !weatherRes.value.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await weatherRes.value.json();
    const weatherParsed = WeatherResponseSchema.safeParse(weatherData);
    if (!weatherParsed.success) {
      console.error('Failed to parse weather API response:', weatherParsed.error)
      return new Response('Invalid data from weather API', { status: 502 })
    }

    // handling aqi data
    let aqiData = null;
    if (aqiRes.status === 'fulfilled' && aqiRes.value.ok) {
      aqiData = await aqiRes.value.json();
      const aqiParsed = AirQualityResponseSchema.safeParse(aqiData);
      if (aqiParsed.success) aqiData = aqiParsed.data;
      else {
        console.warn("Invalid air quality data:", aqiParsed.error);
        aqiData = null;
      }
    } else if (aqiRes.status === "rejected") {
      console.warn('Air quality data unavailable:', aqiRes.reason);
      aqiData = null;
    }

    const uiReadyData = transformWeatherData(weatherParsed.data, aqiData);

    return NextResponse.json(uiReadyData);
  } catch (error) {

  }
}