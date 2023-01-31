export function kelvinToCelsius(temp: number) {
  return Math.round(temp - 273.15);
}

export function kelvintoFahrenheit(temp: number) {
  return Math.round(((temp - 273.15) * 9) / 5 + 32);
}

export function capitalizeWords(line: string) {
  return line
    .toLowerCase()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function unixTimeToLocalTime(unixTime: number) {
  const localOffset = new Date().getTimezoneOffset() * 60;
  const hourMilitary = new Date((unixTime + localOffset) * 1000).getHours();
  const hourClock = ((hourMilitary + 11) % 12) + 1;
  const minutes = new Date((unixTime + localOffset) * 1000).getMinutes();
  const suffix = hourMilitary >= 12 ? "PM" : "AM";
  return minutes === 0 ? `${hourClock}${suffix}` : `${hourClock}:${minutes}${suffix}`;
}

export function unixTimeToLocalDay(unixTime: number) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let localOffset = new Date().getTimezoneOffset() * 60;
  let day = new Date((unixTime + localOffset) * 1000).getDay();

  return days[day];
}
