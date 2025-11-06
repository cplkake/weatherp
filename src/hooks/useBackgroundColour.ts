import { useMemo } from "react";
import chroma from "chroma-js";
import calculatePeriodOfDay from "@/lib/utils/calculatePeriodOfDay";
import calculateProgress from "@/lib/utils/calculateProgress";
import { PeriodOfDay } from "@/types";
import { TransformedWeatherData } from "@/types";
import { backgroundColorValues } from "@/lib/constants/background";
import { Transition } from "@/types";

export function useBackgroundColour(weatherData?: TransformedWeatherData) {
  return useMemo(() => {
    if (!weatherData) return {...backgroundColorValues.midday};
    
    const sunrise = weatherData.current.sunrise;
    const sunset = weatherData.current.sunset;
    const dt = weatherData.current.time;

    if (!sunrise || !sunset) return {...backgroundColorValues.midday};

    const period = calculatePeriodOfDay(sunrise, sunset, dt);
    
    const transitions: Partial<Record<PeriodOfDay, Transition>> = {
      [PeriodOfDay.PreSunriseDawn]: { from: "midnight", to: "twilight", range: [sunrise - 3400, sunrise] },
      [PeriodOfDay.PostSunriseDawn]: { from: "twilight", to: "midday", range: [sunrise, sunrise + 3600] },
      [PeriodOfDay.PreSunsetDusk]: { from: "midday", to: "twilight", range: [sunset - 3600, sunset] },
      [PeriodOfDay.PostSunsetDusk]: { from: "twilight", to: "midnight", range: [sunset, sunset + 3600] },
    } as const;
    
    const transition = transitions[period];
    
    if (!transition) {
      return period === PeriodOfDay.Day
        ? {...backgroundColorValues.midday}
        : {...backgroundColorValues.midnight};
    }

    const progress = calculateProgress(dt, transition.range);
    const fromColors = backgroundColorValues[transition.from];
    const toColors = backgroundColorValues[transition.to];

    const mix = (start: string, end: string) =>
      chroma.mix(start, end, progress, "rgb").hex();

    return {
      TOP: mix(fromColors.TOP, toColors.TOP),
      MIDDLE: mix(fromColors.MIDDLE, toColors.MIDDLE),
      BOTTOM: mix(fromColors.BOTTOM, toColors.BOTTOM),
    };
  }, [weatherData]);
}