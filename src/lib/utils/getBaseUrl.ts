export function getBaseUrl() {
  // Check for explicit environment variable
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // Server-side (SSR or API routes)
  if (typeof window === "undefined") {
    // In Vercel or other hosting, use deployment URL if available
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }

    // Local dev server fallback
    return "http://localhost:3000";
  }

  // Client-side (browser)
  // Works for local dev (including LAN) and production
  return window.location.origin;
}
