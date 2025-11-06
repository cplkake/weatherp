import { NextResponse } from 'next/server'
import { GeocodingResponseSchema } from '@/lib/schemas/geocodingSchema'
import { LocationSuggestion, GeocodingResponse } from '@/lib/schemas/geocodingSchema'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')

  if (!q) return NextResponse.json({ suggestions: [] })

  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}`,
    { cache: 'force-cache' }
  )

  const data: GeocodingResponse = await res.json()
  const dataParsed = GeocodingResponseSchema.safeParse(data);
  if (!dataParsed.success) {
    console.error('Failed to parse geocoding API response:', dataParsed.error)
    return new Response('Invalid data from geocoding API', { status: 502 })
  }

  const suggestions: LocationSuggestion[] = Array.isArray(dataParsed.data.results)
    ? dataParsed.data.results.map(loc => ({
      id: loc.id,
      name: loc.name,
      latitude: loc.latitude,
      longitude: loc.longitude,
      timezone: loc.timezone,
      country: loc.country,
      admin1: loc.admin1,
    }))
    :[]

  return NextResponse.json({ suggestions }, {
    headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate=60' }
  })
}