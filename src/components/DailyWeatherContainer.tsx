import Image from "next/image";
import { celsiusToFahrenheit } from "@/lib/utils";
import { FaRegCalendarDays } from "react-icons/fa6";
import InlineIcon from "./InlineIcon";
import { DailyWeatherProps } from "@/types";
import { TempUnits } from "@/types";

export default function DailyWeatherContainer({
  dailyWeatherData,
  tempUnit
}: {
  dailyWeatherData: DailyWeatherProps | undefined;
  tempUnit: TempUnits;
}) {

  function displayPrecipitationProbability(
    pop: number
  ) {
    
    if (pop) {
      return (
        <p className="text-xs text-sky-300">
          {`${pop}%`}
        </p>
      )
    }
  }

  //TODO: state where dailyData is an empty array - as a result of bad API data
  if (dailyWeatherData) {
    const { weekTemperature, dailyData } = dailyWeatherData;
    const weeklyRange =typeof weekTemperature.high === "number" && typeof weekTemperature.low === "number"
      ? weekTemperature.high - weekTemperature.low
      : null;

    return (
      <div className="w-full mx-auto sm:container rounded-2xl py-3 px-4 backdrop-blur-md bg-gray-500/10 shadow-md overflow-hidden">
        <h2 className="text-xs text-white/50 pb-1 flex items-center gap-1">
          <InlineIcon Icon={FaRegCalendarDays} /> 7-DAY FORECAST
        </h2>
        <div className="grid grid-cols-1 auto-rows-fr">
          {dailyData.map((dataPoint) => {
            const min = dataPoint.temp.min;
            const max = dataPoint.temp.max;

            return (
              <div
                key={dataPoint.time}
                className="container flex basis-52 justify-between items-center py-1 border-t border-black/20 sm:text-base overflow-auto"
              >
                <h3 className="text-white w-1/6">
                  {dataPoint.timeString}
                </h3>
                <div className="flex flex-col items-center justify-evenly">
                  <Image
                    src={`/${dataPoint.weather.icon}.svg`}
                    alt={dataPoint.weather.label}
                    height={30}
                    width={30}
                  />
                  {/* {displayPrecipitationProbability(dataPoint.pop)} */}
                </div>
                {typeof weeklyRange === "number" &&
                typeof min === "number" &&
                typeof max === "number" ? (
                  <div className="flex items-center gap-x-1 sm:gap-x-3 sm:w-3/4 w-2/3">
                    <p className="w-1/6 text-end text-white/70">
                      {tempUnit === TempUnits.Celsius ? min : celsiusToFahrenheit(min)}
                      &deg;
                    </p>
                    <div className="w-2/3 bg-black/20 rounded-full h-1.5">
                      <div
                        className={`bg-sky-500 h-1.5 rounded-full`}
                        style={{
                          width: `${Math.max(((max - min) / weeklyRange) * 100, 5)}%`,
                          marginLeft: `${
                            ((min - weekTemperature.low!) / weeklyRange) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <p className="w-1/6 text-start text-white">
                      {tempUnit === TempUnits.Celsius ? max : celsiusToFahrenheit(max)}
                      &deg;
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center sm:w-3/4 w-2/3 text-white/50 italic">
                    Data unavailable
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    );
  }

  return (
    <></>
  )
}
