import { 
  BackgroundColors,
  ColorCalculator,
  FullData,
  PeriodOfDay,
} from "@/lib/types";
import { backgroundColorValues } from "@/lib/constants/background";

const { midnight, twilight, midday } = backgroundColorValues;

export default function useBackgroundColour(
  retrievedData: FullData | undefined
): BackgroundColors {
  if (retrievedData) {
    const { sunrise: sunriseTime, sunset: sunsetTime, dt: currentTime } = retrievedData.weather.current;
    const preSunriseDawn = sunriseTime - 3400;
    const postSunriseDawn = sunriseTime + 3600;
    const preSunsetDusk = sunsetTime - 3600;
    const postSunsetDusk = sunsetTime + 3600;

    switch(calculatePeriodOfDay(sunriseTime, sunsetTime, currentTime)) {
      case PeriodOfDay.Night:
        return midnight;
      case PeriodOfDay.PreSunriseDawn:
        return sunriseBackground(preSunriseDawn, sunriseTime, currentTime);
      case PeriodOfDay.PostSunriseDawn:
        return postSunriseBackground(sunriseTime, postSunriseDawn, currentTime);
      case PeriodOfDay.Day:
        return midday;
      case PeriodOfDay.PreSunsetDusk:
        return sunsetBackground(preSunsetDusk, sunsetTime, currentTime);
      case PeriodOfDay.PostSunsetDusk:
        return postSunsetBackground(sunsetTime, postSunsetDusk, currentTime)
    }
  }
  
  return midday;
}

function calculatePeriodOfDay(
  sunriseTime: number,
  sunsetTime: number,
  currentTime: number
): PeriodOfDay {
  const preSunriseDawn = sunriseTime - 3400;
  const postSunriseDawn = sunriseTime + 3600;
  const preSunsetDusk = sunsetTime - 3600;
  const postSunsetDusk = sunsetTime + 3600;
  
  if (currentTime <= preSunriseDawn) return PeriodOfDay.Night;
  if (currentTime <= sunriseTime) return PeriodOfDay.PreSunriseDawn;
  if (currentTime <= postSunriseDawn) return PeriodOfDay.PostSunriseDawn
  if (currentTime <= preSunsetDusk) return PeriodOfDay.Day;
  if (currentTime <= sunsetTime) return PeriodOfDay.PreSunsetDusk;
  if (currentTime <= postSunsetDusk) return PeriodOfDay.PostSunsetDusk;
  return PeriodOfDay.Night;
}

// change name to calculateColor
const calculateBackgroundColor = (colorCalculator: ColorCalculator) => 
(startColors: BackgroundColors, endColors: BackgroundColors) => 
(startTime: number, endTime: number, currentTime: number) => 
colorCalculator(startColors, endColors, startTime, endTime, currentTime);

const sunriseBackground = calculateBackgroundColor(colorCalculator)(midnight, twilight);
const postSunriseBackground = calculateBackgroundColor(colorCalculator)(twilight, midday);
const sunsetBackground = calculateBackgroundColor(colorCalculator)(midday, twilight);
const postSunsetBackground = calculateBackgroundColor(colorCalculator)(twilight, midnight);

function colorCalculator(
  startColors: BackgroundColors,
  endColors: BackgroundColors,
  startTime: number,
  endTime: number,
  currentTime: number
): BackgroundColors {
  const topColor = calculateHex(startColors['TOP'], endColors['TOP'], startTime, endTime, currentTime);
  const middleColor = calculateHex(startColors['MIDDLE'], endColors['MIDDLE'], startTime, endTime, currentTime);
  const bottomColor = calculateHex(startColors['BOTTOM'], endColors['BOTTOM'], startTime, endTime, currentTime);

  return {
    TOP: topColor,
    MIDDLE: middleColor,
    BOTTOM: bottomColor,
  }
}

// sets up the given color hex string and times for the gradient calculation
// returns the calculated color values back in hex strings
function calculateHex(
  startColor: string,
  endColor: string,
  startTime: number,
  endTime: number,
  currentTime: number
) {
  let color = "";
  const startColorArray = startColor.match(/.{1,2}/g);
  const endColorArray = endColor.match(/.{1,2}/g);

  if (startColorArray && endColorArray) {
    for (let i = 0; i < 3; i++) {
      color = color.concat(
        Math.ceil(
          calculateGradient(
            startTime,
            endTime,
            currentTime,
            parseInt(startColorArray[i], 16),
            parseInt(endColorArray[i], 16)
          )
        ).toString(16)
      );
    }
    return color;
  } 
  else return "000";
}

// returns the proportionate color decimal value based on the count's distance from min and max
function calculateGradient(
  min: number,
  max: number,
  count: number,
  startColor: number,
  endColor: number
) {
  return (
    ((count - min) / (max - min)) * endColor +
    (1 - (count - min) / (max - min)) * startColor
  );
}