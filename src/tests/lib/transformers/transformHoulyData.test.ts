import { describe, it, expect } from "vitest";
import transformHourlyData from "@/lib/transformers/transformHourlyData";
import type { WeatherResponse } from "@/lib/schemas/weatherSchemas";
import { HourlyWeatherProps, isHourlyWeather } from "@/types";
import { unixTimeToLocalTime } from "@/lib/utils";

const generateHourlyData = () => {
  const baseTime = 1760932800;
  const times = Array.from({ length: 35 }, (_, i) => baseTime + i * 3600);
  const temperatures = times.map((_, i) => 10 + Math.sin(i / 3) * 5 + i * 0.1);
  const weatherCodes = times.map((_, i) => {
    const codes = [0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99, -1] as const;
    return codes[i % codes.length];
  })

  return { times, temperatures, weatherCodes };
};

const hourly = generateHourlyData();

const mockData: WeatherResponse = {
  latitude: 40.7128,
  longitude: -74.006,
  utc_offset_seconds: -18000,
  current: {
    time: hourly.times[5],
    temperature_2m: 13.9,
    is_day: 1,
    weather_code: 45,
    apparent_temperature: 10.1,
    relative_humidity_2m: 41,
    wind_speed_10m: 10.9,
    dew_point_2m: 6.5,
  },
  hourly: {
    time: hourly.times,
    temperature_2m: hourly.temperatures,
    weather_code: hourly.weatherCodes,
  },
  daily: {
    time: [
      1760932800, 1761019200, 1761105600, 1761192000,
      1761278400, 1761364800, 1761451200,
    ],
    sunrise: [
      1760960319, 1761046795, 1761133271, 1761219748,
      1761306225, 1761392702, 1761479179,
    ],
    sunset: [
      1760999154, 1761085459, 1761171764, 1761258070,
      1761344378, 1761430686, 1761516996,
    ],
    temperature_2m_max: [14.6, 13.4, 10.2, 10.8, 11.7, 12.6, 12.3],
    temperature_2m_min: [7.2, 5.1, 7.3, 7.2, 7.1, 6.9, 9.0],
    weather_code: [63, 3, 61, 51, 51, 3, 3],
  },
};

describe("transformHourlyData", () => {
  it("returns an array with the current weather as the first item", () => {
    const result = transformHourlyData(mockData);

    expect(result.length).toBeGreaterThan(0);

    const first = result[0];

    // First item should be the current weather
    expect(first.kind).toBe("weather");
    expect(first.timeString).toBe("Now");
    expect(first.weather).toHaveProperty("code");
    expect(first.weather).toHaveProperty("label");
    expect(first.weather).toHaveProperty("icon");
  });

  it("returns 25 hourly data points starting from the current time", () => {
    const result: HourlyWeatherProps = transformHourlyData(mockData);

    // Should contain 25 hours of data plus twilight events (sorted)
    const hourlyCount = result.filter(r => "temp" in r).length;
    expect(hourlyCount).toBe(25);

    // Times should be sorted ascending
    const times = result.map(r => r.time);
    expect([...times].sort((a, b) => a - b)).toEqual(times);
  });

  it("ensures each hourly weather entry has correct structure and types", () => {
    const result: HourlyWeatherProps = transformHourlyData(mockData);
    const hourlyItems = result.filter(isHourlyWeather);

    for (const item of hourlyItems) {
      expect(typeof item.time).toBe("number");
      expect(typeof item.temp).toBe("number");
      expect(item.weather).toBeDefined();
      expect(typeof item.weather.code).toBe("number");
      expect(typeof item.weather.label).toBe("string");
      expect(typeof item.weather.icon).toBe("string");
    }
  });

  it("adds timeString for all items", () => {
    const result = transformHourlyData(mockData);

    for (let i = 0; i < result.length; i++) {
      const h = result[i];
      expect(h).toHaveProperty("timeString");
      expect(typeof h.timeString).toBe("string");

      // The first one is "Now", the rest should be formatted
      if (i > 0 && h.kind === "weather") {
        expect(h.timeString).toBe(unixTimeToLocalTime(h.time,mockData.utc_offset_seconds));
      }
    }
  });

  it("ensures hourly times are in ascending order", () => {
    const result = transformHourlyData(mockData);
    const times = result.map(r => r.time);
    const sorted = [...times].sort((a, b) => a - b);
    expect(times).toEqual(sorted);
  });

  it("includes sunrise and sunset within next 24 hours", () => {
    const result = transformHourlyData(mockData);

    const twilightLabels = result
      .filter(r => "weather" in r && !("temp" in r))
      .map(r => r.weather.label);

    expect(twilightLabels).toContain("Sunrise");
    expect(twilightLabels).toContain("Sunset");
  });

  it("handles missing hourly data gracefully", () => {
    const badData = { ...mockData, hourly: undefined } as unknown as WeatherResponse;
    const result = transformHourlyData(badData);
    expect(result).toEqual([]);
  });

  it("handles current time beyond available hourly data", () => {
    const altered = structuredClone(mockData);
    altered.current.time = 9999999999; // way beyond

    const result = transformHourlyData(altered);
    const hourlyCount = result.filter(r => "temp" in r).length;

    expect(hourlyCount).toBeLessThanOrEqual(25);
  });

  it("rounds temperatures correctly", () => {
    const result = transformHourlyData(mockData);
    const temps = result
      .filter(r => "temp" in r)
      .map(r => (r as any).temp);

    temps.forEach(t => {
      if (t != null) expect(Number.isInteger(t)).toBe(true);
    });
  });
});
