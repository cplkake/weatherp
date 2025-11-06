import { describe, it, expect } from "vitest";
import { WeatherResponseSchema, WeatherCodeSchema, WeatherResponse } from "@/lib/schemas/weatherSchemas";
import { WeatherCodes } from "@/lib/constants/weatherCodes";

describe("WeatherResponseSchema", () => {
  const validMockData: WeatherResponse = {
    latitude: 40.7128,
    longitude: -74.0060,
    utc_offset_seconds: -18000,
    current: {
      time: 1760982300,
      is_day: 1,
      temperature_2m: 13.9,
      weather_code: 45,
      apparent_temperature: 10.1,
      relative_humidity_2m: 41,
      wind_speed_10m: 10.9,
      dew_point_2m: 6.5,
    },
    hourly: {
      time: [1760932800, 1760936400],
      temperature_2m: [14.6, 14.1],
      weather_code: [51, 63],
    },
    daily: {
      time: [1760932800, 1761019200],
      sunrise: [1760960319, 1761046795],
      sunset: [1760999154, 1761085459],
      temperature_2m_max: [14.6, 13.4],
      temperature_2m_min: [7.2, 5.1],
      weather_code: [63, 3],
    },
  };

  it("parses valid data correctly", () => {
    const parsed = WeatherResponseSchema.parse(validMockData);
    expect(parsed.current.temperature_2m).toBe(13.9);
    expect(parsed.daily!.temperature_2m_max?.[1]).toBe(13.4);
  });

  it("coerces invalid current weather temperature to null", () => {
    const invalidCurrent = {
      ...validMockData,
      current: { ...validMockData.current, temperature_2m: 200 }, // exceeds max
    };
    const parsed = WeatherResponseSchema.parse(invalidCurrent);
    expect(parsed.current.temperature_2m).toBe(null);
  });

  it("handles missing hourly and daily data gracefully", () => {
    const partialData = {
      ...validMockData,
      hourly: undefined,
      daily: undefined,
    };
    const parsed = WeatherResponseSchema.parse(partialData);
    expect(parsed.hourly).toBeUndefined();
    expect(parsed.daily).toBeUndefined();
  });

  it("coerces invalid weather codes in hourly/daily to fallback (-1)", () => {
    const badCodes = {
      ...validMockData,
      hourly: { ...validMockData.hourly, weather_code: ["oops" as any] },
      daily: { ...validMockData.daily, weather_code: ["bad" as any] },
    };
    const parsed = WeatherResponseSchema.parse(badCodes);
    expect(parsed.hourly!.weather_code?.[0]).toBe(-1);
    expect(parsed.daily!.weather_code?.[0]).toBe(-1);
  });

  it("coerces invalid temperatures to null in hourly/daily", () => {
    const badTemps = {
      ...validMockData,
      hourly: { ...validMockData.hourly, temperature_2m: [200] },
      daily: { ...validMockData.daily, temperature_2m_max: [200], temperature_2m_min: [-200] },
    };
    const parsed = WeatherResponseSchema.parse(badTemps);
    expect(parsed.hourly!.temperature_2m?.[0]).toBeNull();
    expect(parsed.daily!.temperature_2m_max?.[0]).toBeNull();
    expect(parsed.daily!.temperature_2m_min?.[0]).toBeNull();
  });

  it("validates latitude and longitude ranges", () => {
    expect(() => WeatherResponseSchema.parse({ ...validMockData, latitude: 200 })).toThrow();
    expect(() => WeatherResponseSchema.parse({ ...validMockData, longitude: -200 })).toThrow();
  });

});
