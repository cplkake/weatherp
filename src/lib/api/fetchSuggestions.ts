import { apiFetch } from './client'
import { getBaseUrl } from '../utils/getBaseUrl'
import { LocationResponse, LocationSuggestion } from '../schemas/geocodingSchema';

export default async function fetchSuggestions(
  query: string,
  signal?: AbortSignal
): Promise<LocationSuggestion[]> {
  if (query.length < 2) return []
  
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/geocoding?q=${encodeURIComponent(query)}`
  
  const data = await apiFetch<LocationResponse>(url, { signal })
  
  return Array.isArray(data.suggestions) ? data.suggestions : []
}