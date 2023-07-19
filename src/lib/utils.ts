// TODO: Ideally you should split every function in a file to keep everything atomic and isolated
//  And by having everything split you can then unit test all your functions
//  You just have to export all of then with an index.ts in your /lib folder so you don't have to change existing imports
//  Also think about adding type on what your function returns

export function kelvinToCelsius(temp: number) {
  // TODO: Extract 273.15 in a const variable and precise what it mean
  //  By doing that you make explicit what 273.15  means
  return Math.round(temp - 273.15);
}

// TODO: Typo on kelvintoFahrenheit, should be kelvinToFahrenheit
export function kelvintoFahrenheit(temp: number) {
  return Math.round(((temp - 273.15) * 9) / 5 + 32);
}

export function capitalizeWords(line: string) {
  return line
    .toLowerCase()
    .split(" ")
    .map(word => {
      // TODO: Maybe declare an array of words you don't want to be permuted and pass it to the function
      //  By doing this you will lower the coupling between the function and the constants parameters
      //  You will also improve readability if you pass an array instead of making comparaison for each param
      //  eg: wordsThatDontNeedPermutation.indexOf(word) > -1 ? word : word[0].toUpperCase() + word.slice(1)
  		return (word === 'and') || (word === 'with') ? word : word[0].toUpperCase() + word.slice(1)
    })
    .join(" ");
}

export function unixTimeToLocalTime(unixTime: number) {
  const localOffset = new Date().getTimezoneOffset() * 60;
  const hourMilitary = new Date((unixTime + localOffset) * 1000).getHours();
  const hourClock = ((hourMilitary + 11) % 12) + 1;
  // TODO: I think we can set minutes as a const here as it doesnt get mutated after definition
  let minutes = new Date((unixTime + localOffset) * 1000).getMinutes();
  const suffix = hourMilitary >= 12 ? "PM" : "AM";

  // TODO: as minutesString is not always called, you should call your toString function after the condition is passed
  //   Otherwise you will a phantom var
  // ensure that minutes is always 2 digits
  const minutesString = minutes.toString().length === 1 ? `0${minutes}` : `${minutes}`

  // TODO You can test minutes directly as 0 === false in javascript
  //  eg: minutes ? `${hourClock}:${minutesString}${suffix}` : `${hourClock}${suffix}`;
  return minutes === 0 ? `${hourClock}${suffix}` : `${hourClock}:${minutesString}${suffix}`;
}

export function unixTimeToLocalDay(unixTime: number) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let localOffset = new Date().getTimezoneOffset() * 60;
  let day = new Date((unixTime + localOffset) * 1000).getDay();

  return days[day];
}
