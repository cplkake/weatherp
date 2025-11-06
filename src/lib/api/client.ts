/*
 * A lightweight wrapper around the native Fetch API
 * for consistent error handling and typed responses.
 */
export async function apiFetch<T>(
  input: string | URL,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(input, options)

  if (!res.ok) {
    const message = `API Error: ${res.status} ${res.statusText}`
    throw new Error(message)
  }

  try {
    return (await res.json()) as T
  } catch {
    throw new Error('Failed to parse JSON response')
  }
}
