import * as z from "zod";
import { WeatherCodes } from "../constants/weatherCodes";

const unixTimestamp = z.number().int().nonnegative();

const nullableUnixTimestamp = z
  .number()
  .int()
  .nonnegative()
  .nullable()
  .catch(null)

export const WeatherCodeSchema = z
  .union([...WeatherCodes.map(w => z.literal(w.code))] as const)
  .catch(-1);

export const temperatureCelsius = z
  .coerce
  .number()
  .gte(-95, { message: "Temperature too low" })
  .lte(70, { message: "Temperature too high" })
  .nullable()
  .catch(null);

const probability = z
  .coerce
  .number()
  .gte(0, { message: "No negative probability possible" })
  .lte(100, { message: "Probability is too high" })
  .nullable()
  .catch(null);

const latitudeSchema = z.number().min(-90).max(90);
const longitudeSchema = z.number().min(-180).max(180);

const wind_speed_kmh = z.number().min(0).max(150);

const CurrentWeatherSchema = z
  .object({
    time: unixTimestamp,
    is_day: z.union([z.literal(0), z.literal(1)]),
    temperature_2m: temperatureCelsius,
    weather_code: WeatherCodeSchema,
    apparent_temperature: temperatureCelsius,
    relative_humidity_2m: probability,
    wind_speed_10m: wind_speed_kmh.optional(),
    dew_point_2m: temperatureCelsius,
  });

const HourlyWeatherSchema = z
  .object({
    time: z.array(unixTimestamp).optional(),
    temperature_2m: z.array(temperatureCelsius).optional(),
    weather_code: z.array(WeatherCodeSchema).optional(),
    precipitation_probability: z.array(probability).optional(),
  })

const DailyWeatherSchema = z.object({
  time: z.array(unixTimestamp),
  sunrise: z.array(nullableUnixTimestamp).optional(),
  sunset: z.array(nullableUnixTimestamp).optional(),
  temperature_2m_max: z.array(temperatureCelsius).optional(),
  temperature_2m_min: z.array(temperatureCelsius).optional(),
  weather_code: z.array(WeatherCodeSchema).optional(),
  precipitation_probability_mean: z.array(probability).optional(),
})

export const WeatherResponseSchema = z.object({
  latitude: latitudeSchema,
  longitude: longitudeSchema,
  utc_offset_seconds: z.number(),
  current: CurrentWeatherSchema,
  hourly: HourlyWeatherSchema.optional(),
  daily: DailyWeatherSchema.optional(),
})

export type WeatherResponse = z.infer<typeof WeatherResponseSchema>
export type WeatherCode = z.infer<typeof WeatherCodeSchema>
export type CurrentWeatherResponse = z.infer<typeof CurrentWeatherSchema>