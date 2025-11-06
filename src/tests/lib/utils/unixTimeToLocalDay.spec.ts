import { describe, it, expect } from "vitest";
import { unixTimeToLocalDay } from "@/lib/utils";

describe("unixTimeToLocalDay", () => {
  it("should return the correct day for UTC time", () => {
    // 1 Jan 2025 00:00:00 UTC is a Wednesday
    const timestamp = 1735689600;
    expect(unixTimeToLocalDay(timestamp, 0)).toBe("Wed");
  });

  it("should handle positive UTC offsets", () => {
    // 1 Jan 2025 00:00:00 UTC, UTC+3 should still be Wednesday
    const timestamp = 1735689600;
    expect(unixTimeToLocalDay(timestamp, 3 * 3600)).toBe("Wed");
  });

  it("should handle negative UTC offsets", () => {
    // 1 Jan 2025 00:00:00 UTC, UTC-5 should be Tuesday
    const timestamp = 1735689600;
    expect(unixTimeToLocalDay(timestamp, -5 * 3600)).toBe("Tue");
  });

  it("should handle timestamps at the end of a day", () => {
    // 31 Dec 2024 23:00:00 UTC, UTC+2 should be Wed (next day)
    const timestamp = 1735682400;
    expect(unixTimeToLocalDay(timestamp, 2 * 3600)).toBe("Wed");
  });

  it("should handle negative timestamps (before 1970)", () => {
    // 31 Dec 1969 23:00:00 UTC
    const timestamp = -3600;
    expect(unixTimeToLocalDay(timestamp, 0)).toBe("Wed");
  });

  it("should handle large UTC offsets beyond 24h", () => {
    const timestamp = 1735689600;
    expect(unixTimeToLocalDay(timestamp, 27 * 3600)).toBe("Thu"); // +27h shifts a day forward
  });
});
