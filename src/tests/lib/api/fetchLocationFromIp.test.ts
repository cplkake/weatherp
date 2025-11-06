import { describe, it, expect, beforeEach, afterAll, vi } from "vitest";
import fetchLocationFromIp from "@/lib/api/fetchLocationFromIp";
import { LocationSuggestion } from "@/lib/schemas/geocodingSchema";

describe("fetchLocationFromIp", () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it("returns default location in development", async () => {
    (process.env as any).NODE_ENV = "development";

    const result = await fetchLocationFromIp("any-ip");
    expect(result).toEqual<LocationSuggestion>({
      id: 6167865,
      name: "Toronto",
      latitude: 43.65107,
      longitude: -79.347015,
      timezone: "America/Toronto",
      country: "Canada",
      admin1: "Ontario",
    });
  });

  it("returns location from API on success", async () => {
    (process.env as any).NODE_ENV = "production";

    const mockData = {
      city: "Tokyo",
      latitude: 35.6895,
      longitude: 139.6917,
      timezone: { id: "Asia/Tokyo" },
      country: "Japan",
      region: "Tokyo",
    };

    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as any)
    ));

    const result = await fetchLocationFromIp("8.8.8.8");

    expect(result).toEqual<LocationSuggestion>({
      id: 0,
      name: "Tokyo",
      latitude: 35.6895,
      longitude: 139.6917,
      timezone: "Asia/Tokyo",
      country: "Japan",
      admin1: "Tokyo",
    });
  });

  it("returns null when fetch fails", async () => {
    (process.env as any).NODE_ENV = "production";

    vi.stubGlobal("fetch", vi.fn(() => Promise.reject("Network error")));

    const result = await fetchLocationFromIp("8.8.8.8");
    expect(result).toBeNull();
  });

  it("returns null when response is not ok", async () => {
    (process.env as any).NODE_ENV = "production";

    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({ ok: false, statusText: "Too Many Requests" } as any)
    ));

    const result = await fetchLocationFromIp("8.8.8.8");
    expect(result).toBeNull();
  });

  it("returns null when latitude/longitude missing", async () => {
    (process.env as any).NODE_ENV = "production";

    const mockData = {
      city: "Unknown",
      latitude: null,
      longitude: null,
      timezone: { id: "UTC" },
      country: "Nowhere",
      region: "Nowhere",
    };

    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as any)
    ));

    const result = await fetchLocationFromIp("8.8.8.8");
    expect(result).toBeNull();
  });

  test.todo("should abort fetch if it takes too long", async () => {
    // TODO: implement test for AbortController timeout
  });
});
