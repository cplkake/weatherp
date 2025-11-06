// Given a unix timestamp for a location, return a three letter string representation of the day
export default function unixTimeToLocalDay(
  unixTime: number,
  utcOffsetSeconds: number
): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Shift the UTC timestamp by the location’s UTC offset
  const localTime = unixTime + utcOffsetSeconds;

  // Use getUTCDay() since we've already applied the offset manually
  const day = new Date(localTime * 1000).getUTCDay();

  return days[day];
}

