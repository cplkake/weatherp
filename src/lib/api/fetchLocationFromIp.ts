import { LocationSuggestion } from "../schemas/geocodingSchema"

export default async function fetchLocationFromIp(ip: string): Promise<LocationSuggestion | null> {
  if (process.env.NODE_ENV === "development") {
    return {
      id: 6167865,
      name: "Toronto",
      latitude: 43.65107,
      longitude: -79.347015,
      timezone: "America/Toronto",
      country: "Canada",
      admin1: "Ontario",
    };
  }
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`https://ipwho.is/${ip}`, {
      signal: controller.signal,
      next: { revalidate: 60 * 60 },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`IP location lookup failed: ${res.statusText}`);
      return null;
    }

    const data = await res.json();

    if (!data) {
      console.warn("No data, using fallback")
      return null;
    }
    if (!data.latitude || !data.longitude) {
      console.log(data)
      console.warn("Data missing lat or lon, using fallback")
      return null;
    }

    return {
      id: 0,
      name: data.city || "Unknown",
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone.id || "UTC",
      country: data.country || "",
      admin1: data.region || "",
    };
  } catch (err: any) {
    console.error(err);
    return null;
  }
}