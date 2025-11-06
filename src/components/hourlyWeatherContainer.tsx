import Image from "next/image";
import { celsiusToFahrenheit } from "@/lib/utils";
import { FaRegClock } from "react-icons/fa6";
import InlineIcon from "./InlineIcon";
import { HourlyWeatherProps, HourlyWeather, TwilightTime, TempUnits } from "@/types";

export default function HourlyWeatherContainer({
  hourlyWeatherData,
  tempUnit,
}: {
  hourlyWeatherData: HourlyWeatherProps | undefined; 
  tempUnit: TempUnits;
}) {

  function displayTimes(
    timeString: string,
  ) {
    return (
      <p className="text-sm">
        {timeString.slice(0, timeString.length - 2)}<span className="text-xs">{timeString.slice(timeString.length - 2)}</span>
      </p>
    )
  }
  
  function displayPrecipitationProbability(
    index: number,
    dataPoint: HourlyWeatherProps
  ) {
    // exclude the current weather and the sunrise/sunsets dataPoints that do not have pop
    if (index !== 0 && 'pop' in dataPoint && dataPoint.pop) {
      return (
        <p className="text-xs text-sky-300">
          {`${dataPoint.pop}%`}
        </p>
      )
    }
  }
  
  function displayDescription(
    dataPoint: HourlyWeather | TwilightTime
  ) {
    if (dataPoint.kind === "weather") {
      if (dataPoint.temp === null) return "—";
      return tempUnit === TempUnits.Celsius ? `${dataPoint.temp}\u00B0` : `${celsiusToFahrenheit(dataPoint.temp)}\u00B0`;
    }
    else return dataPoint.weather.label;
  }

  if (hourlyWeatherData) {
    return (
      <div className="w-full mx-auto sm:container rounded-2xl p-4 sm:px-4 backdrop-blur-md bg-gray-500/10 shadow-md">
        <h2 className="text-xs text-white/50 pb-0.5 flex items-center gap-1">
          <InlineIcon Icon={FaRegClock} />HOURLY FORECAST
        </h2>
        <div className="flex gap-x-5 overflow-x-scroll text-white">
          {hourlyWeatherData.map((dataPoint) => (
            <div key={dataPoint.time} className="flex flex-col basis-10 shrink-0 justify-between items-center">
              <h3>
                {displayTimes(dataPoint.timeString)}
              </h3>
              <div className="flex flex-col items-center justify-evenly">
                <Image
                  src={`/${dataPoint.weather.icon}.svg`}
                  alt={dataPoint.weather.label}
                  width={35}
                  height={35}
                  />
                  {/* {displayPrecipitationProbability(index, dataPoint)} */}
              </div>
              <p>
                {displayDescription(dataPoint)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <></>
  );
}