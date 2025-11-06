import { describe, it, expect } from "vitest";
import unixTimeToLocalTime from "@/lib/utils/unixTimeToLocalTime";

describe("unixTimeToLocalTime", () => {
  const SGT_OFFSET = 8 * 3600;   // Asia/Singapore UTC+8
  const NYC_OFFSET = -4 * 3600;  // UTC-4 for New York (EDT example)

  it("formats hour without minutes correctly (SGT +8)", () => {
    // 1761518700 = 2025-10-26T22:45:00Z -> 6:45AM Singapore
    const result = unixTimeToLocalTime(1761518700, SGT_OFFSET);
    expect(result).toBe("6:45AM");
  });

  it("formats hour with minutes correctly (SGT +8)", () => {
    // 2025-10-26T22:05:00Z -> 6:05AM Singapore
    const unixTime = 1761516300;
    const result = unixTimeToLocalTime(unixTime, SGT_OFFSET);
    expect(result).toBe("6:05AM");
  });

  it("handles midnight correctly (SGT +8)", () => {
    // 2025-10-26T16:00:00Z -> 12AM Singapore (27 Oct)
    const unixTime = 1761494400;
    const result = unixTimeToLocalTime(unixTime, SGT_OFFSET);
    expect(result).toBe("12AM");
  });

  it("handles noon correctly (SGT +8)", () => {
    // 2025-10-26T04:00:00Z -> 12PM Singapore (26 Oct)
    const unixTime = 1761451200;
    const result = unixTimeToLocalTime(unixTime, SGT_OFFSET);
    expect(result).toBe("12PM");
  });

  it("works for a different timezone (NYC -4)", () => {
    // 2025-10-26T22:45:00Z -> 6:45PM New York (UTC-4)
    const unixTime = 1761518700;
    const result = unixTimeToLocalTime(unixTime, NYC_OFFSET);
    expect(result).toBe("6:45PM");
  });
});
