// Given a unix timestamp for a location, return a three letter string representation of the day
export default function unixTimeToLocalDay(unixTime: number): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const localOffset = new Date().getTimezoneOffset() * 60;
  
  const day = new Date((unixTime + localOffset) * 1000).getDay();

  return days[day];
}
