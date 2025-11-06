/**
 * Convert a UTC UNIX timestamp (in seconds) into a formatted local time string
 * using the provided UTC offset in seconds (from the API).
 *
 * Example:
 *   unixTimeToLocalTime(1761518700, 28800) → "4:45PM"   // Singapore UTC+8
 */
export default function unixTimeToLocalTime(
  unixTime: number,
  utcOffsetSeconds: number
): string {
  // Shift UTC timestamp by offset
  const localTime = unixTime + utcOffsetSeconds;
  const date = new Date(localTime * 1000);

  const hours = date.getUTCHours(); // getUTCHours because we've already applied offset
  const minutes = date.getUTCMinutes();

  const hour12 = ((hours + 11) % 12) + 1;
  const suffix = hours >= 12 ? "PM" : "AM";

  return minutes === 0
    ? `${hour12}${suffix}`
    : `${hour12}:${minutes.toString().padStart(2, "0")}${suffix}`;
}
