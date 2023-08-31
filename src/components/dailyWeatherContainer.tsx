import Image from "next/image";
import { DailyWeatherOverview } from "@/lib/types";


export default function DailyWeatherContainer({
  dailyWeatherData
}: {
  dailyWeatherData: DailyWeatherOverview | undefined;
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

  if (dailyWeatherData) {
    const { weekTemperature, dailyData } = dailyWeatherData;
    const weeklyRange = weekTemperature.high - weekTemperature.low;

    return (
      <div className="w-full mx-auto sm:container rounded-2xl py-3 px-4 backdrop-blur-md bg-gray-500/10 shadow-md overflow-hidden">
        <h2 className="text-xs text-white/50 pb-1">8-DAY FORECAST</h2>
        <div className="grid grid-cols-1 auto-rows-fr">
          {dailyData.map((dataPoint, index) => (
            <div
              key={dataPoint.dt}
              className="container flex basis-52 justify-between items-center border-t border-black/20 sm:text-base overflow-auto"
            >
              <h3 className="text-white w-1/6">
                {dataPoint.timeString}
              </h3>
              <div className="flex flex-col items-center justify-evenly">
                <Image
                  src={`/${dataPoint.weather.icon}.svg`}
                  alt={dataPoint.weather.description}
                  height={30}
                  width={30}
                />
                {displayPrecipitationProbability(dataPoint.pop)}
              </div>
              <div className="flex items-center gap-x-1 sm:gap-x-3 sm:w-3/4 w-2/3">
                <p className="w-1/6 text-end text-white/70">
                  {dataPoint.temp.min}
                  &deg;
                </p>
                <div className="w-2/3 bg-black/20 rounded-full h-1.5">
                  <div
                    className={`bg-sky-500 h-1.5 rounded-full`}
                    style={{
                      width: `${Math.max(((dataPoint.temp.max - dataPoint.temp.min) / weeklyRange) * 100, 5)}%`,
                      marginLeft: `${
                        ((dataPoint.temp.min - weekTemperature.low) / weeklyRange) * 100
                      }%`,
                    }}
                  />
                </div>
                <p className="w-1/6 text-start text-white">
                  {dataPoint.temp.max}
                  &deg;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <></>
  )
}
