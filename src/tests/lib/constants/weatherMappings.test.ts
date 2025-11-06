import {
  getWeatherDescription,
  getWeatherIcon,
} from '@/lib/constants/weatherMappings'
import { WeatherCodes } from '@/lib/constants/weatherCodes'

describe('weatherMappings', () => {
  describe('getWeatherDescription', () => {
    it('returns correct description for known codes', () => {
      for (const { code, label } of WeatherCodes) {
        expect(getWeatherDescription(code)).toBe(label)
      }
    })

    it('returns "Unknown" for unknown code', () => {
      expect(getWeatherDescription(999)).toBe('Unknown')
      expect(getWeatherDescription(-1)).toBe('Unknown')
      expect(getWeatherDescription(NaN)).toBe('Unknown')
      expect(getWeatherDescription(null as unknown as number)).toBe('Unknown')
    })
  })

  describe('getWeatherIcon', () => {
    it('returns correct icon filename for known codes', () => {
      for (const { code, icon } of WeatherCodes) {
        expect(getWeatherIcon(code)).toBe(icon)
      }
    })

    it('returns default icon for unknown code', () => {
      expect(getWeatherIcon(999)).toBe('/icons/default.svg')
      expect(getWeatherIcon(-5)).toBe('/icons/default.svg')
      expect(getWeatherIcon(NaN)).toBe('/icons/default.svg')
      expect(getWeatherIcon(undefined as unknown as number)).toBe('/icons/default.svg')
    })
  })
})
