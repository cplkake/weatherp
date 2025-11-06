import { z } from "zod";

const nullableUnixTimestamp = z
  .number()
  .int()
  .nonnegative()
  .nullable()
  .catch(null)

export const AirQualityResponseSchema = z
  .object({
    current: z.object({
      time: nullableUnixTimestamp,
      interval: z.number().nullable().optional(),
      us_aqi: z.number().min(0).max(500),
      european_aqi: z.number().optional(),
    }),
  })
  .nullable();


export type AirQualityResponse = z.infer<typeof AirQualityResponseSchema>;
