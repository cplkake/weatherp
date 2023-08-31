// converts a provided unix timestamp to a string representation in the format "<hour><AM | PM>" or "<hour>:<minute><AM | PM>"
export default function unixTimeToLocalTime(unixTime: number): string {
  const localOffset = new Date().getTimezoneOffset() * 60;

  const hourMilitary = new Date((unixTime + localOffset) * 1000).getHours();

  const hourClock = ((hourMilitary + 11) % 12) + 1;
  const minutes = new Date((unixTime + localOffset) * 1000).getMinutes();
  const suffix = hourMilitary >= 12 ? "PM" : "AM";

  if (!minutes) {
    return `${hourClock}${suffix}`;
  }
  
  const minutesString = minutes.toString().length === 1 ? `0${minutes}` : `${minutes}`

  return `${hourClock}:${minutesString}${suffix}`;
}
