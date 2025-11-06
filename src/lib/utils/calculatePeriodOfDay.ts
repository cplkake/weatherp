import { PeriodOfDay } from "@/types";

export default function calculatePeriodOfDay(
  sunrise: number,
  sunset: number,
  current: number
): PeriodOfDay {
  const preSunrise = sunrise - 3400;
  const postSunrise = sunrise + 3600;
  const preSunset = sunset - 3600;
  const postSunset = sunset + 3600;

  if (current <= preSunrise) return PeriodOfDay.Night;
  if (current <= sunrise) return PeriodOfDay.PreSunriseDawn;
  if (current <= postSunrise) return PeriodOfDay.PostSunriseDawn;
  if (current <= preSunset) return PeriodOfDay.Day;
  if (current <= sunset) return PeriodOfDay.PreSunsetDusk;
  if (current <= postSunset) return PeriodOfDay.PostSunsetDusk;
  return PeriodOfDay.Night;
}