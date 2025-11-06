import { WeatherCodes } from './weatherCodes'
import { WeatherCode } from '../schemas/weatherSchemas'

const WeatherDescriptions: Record<number, string> = Object.fromEntries(
  WeatherCodes.map(w => [w.code, w.label])
)

export const WeatherIcons: Record<number, string> = Object.fromEntries(
  WeatherCodes.map(w => [w.code, w.icon])
)

export function getWeatherDescription(code: WeatherCode): string {
  return WeatherDescriptions[code] ?? 'Unknown'
}

export function getWeatherIcon(code: number): string {
  return WeatherIcons[code] ?? '/icons/default.svg'
}
