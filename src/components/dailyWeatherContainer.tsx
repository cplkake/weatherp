import Image from "next/image";
import {
  kelvinToCelsius,
  kelvintoFahrenheit,
  unixTimeToLocalDay,
} from "@/lib/utils";

// TODO: You should extract your interface in another folder for better clarity
interface DailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    min: number;
    max: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  pop: number;
}

export default function DailyWeatherContainer({
  tempUnit,
  timeZoneOffset,
  dailyData,
}: {
  // TODO: You should use an enum here as discussed in currentWeatherContainer.tsx
  tempUnit: "C" | "F";
  timeZoneOffset: number;
  dailyData: Array<DailyWeather>;
}) {
  // TODO: Rather than using dailyData[0] you should use array deconstruction
  //  eg: const [firstDay] = dailyData
  const firstDayHigh = dailyData[0].temp.max;
  const firstDayLow = dailyData[0].temp.min;
  
  const lowestWeekTemp = dailyData.reduce(
    (lowest, current) => Math.min(lowest, current.temp.min),
    firstDayLow
  );
  const highestWeekTemp = dailyData.reduce(
    (highest, current) => Math.max(highest, current.temp.max),
    firstDayHigh
  );
  const weeklyRange = highestWeekTemp - lowestWeekTemp;

  // TODO: Always use meaningful function names
  //  A long function name is always better than a shorter one as it is more explicit
  //  eg: displayPreicipationProbabilty
  function displayProbOfPrecip(
    weatherId: number | undefined,
    probOfPrecip: number | undefined,
  ) {
    // TODO: Define PRECIP_CODE only if you pass first condition
    //  Maybe we could use an enumeration here
    const PRECIP_CODE = ['2', '3', '5', '6'];

    // TODO: As weatherId and probOfPrecip are required maybe you should check if they are not null before calling your function
    //  And then remove undefined type from parameters definition
    if (weatherId && probOfPrecip) {
      if (PRECIP_CODE.includes(weatherId.toString().charAt(0))) {
        return (
          <p className="text-xs text-sky-300">
            {`${Math.round(probOfPrecip * 10) * 10}%`}
          </p>
        )
      }
    }
  }

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
              {index === 0
                ? "Today"
                : unixTimeToLocalDay(dataPoint.dt + timeZoneOffset)}
            </h3>
            <div className="flex flex-col items-center justify-evenly">
              <Image
                src={`/${dataPoint.weather[0].icon}.svg`}
                alt={dataPoint.weather[0].description}
                height={30}
                width={30}
              />
              {displayProbOfPrecip(dataPoint.weather[0].id, dataPoint.pop)}
            </div>
            <div className="flex items-center gap-x-1 sm:gap-x-3 sm:w-3/4 w-2/3">
              <p className="w-1/6 text-end text-white/70">
                {tempUnit === "C"
                  ? kelvinToCelsius(dataPoint.temp.min)
                  : kelvintoFahrenheit(dataPoint.temp.min)}
                &deg;
              </p>
              <div className="w-2/3 bg-black/20 rounded-full h-1.5">
                <div
                  className={`bg-sky-500 h-1.5 rounded-full`}
                  style={{
                    width: `${
                      ((dataPoint.temp.max - dataPoint.temp.min) / weeklyRange) *
                      100
                    }%`,
                    marginLeft: `${
                      ((dataPoint.temp.min - lowestWeekTemp) / weeklyRange) * 100
                    }%`,
                  }}
                />
              </div>
              <p className="w-1/6 text-start text-white">
                {tempUnit === "C"
                  ? kelvinToCelsius(dataPoint.temp.max)
                  : kelvintoFahrenheit(dataPoint.temp.max)}
                &deg;
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
