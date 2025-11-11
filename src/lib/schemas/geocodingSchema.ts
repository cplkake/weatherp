import { z } from 'zod'

const timezoneFormat = z.string().regex(
  /^[A-Za-z0-9_\+\-]+(?:\/[A-Za-z0-9_\+\-]+)*$/,
  'Invalid IANA timezone format'
)

export const LocationSuggestionSchema = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  timezone: timezoneFormat,
  country: z.string(),
  admin1: z.string().catch(''),
})

export const GeocodingResponseSchema = z.object({
  results: z.array(LocationSuggestionSchema),
})

export const LocationResponseSchema = z.object({
  suggestions: z.array(LocationSuggestionSchema),
})

export type LocationSuggestion = z.infer<typeof LocationSuggestionSchema>
export type GeocodingResponse = z.infer<typeof GeocodingResponseSchema>
export type LocationResponse = z.infer<typeof LocationResponseSchema>