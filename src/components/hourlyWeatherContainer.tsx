import Image from "next/image";
import {
  kelvinToCelsius,
  kelvintoFahrenheit,
  unixTimeToLocalTime,
} from "@/lib/utils";

interface HourlyWeather {
  dt: number;
  temp?: number;
  weather: [
    {
      id?: number;
      description: string;
      icon: string;
    }
  ];
  pop?: number;
}

export default function HourlyWeatherContainer({
  tempUnit,
  timeZoneOffset,
  hourlyData,
  relevantTwilightTimes,
}: {
  tempUnit: "C" | "F";
  timeZoneOffset: number;
  hourlyData: Array<HourlyWeather>;
  relevantTwilightTimes: Array<HourlyWeather>;
}) {
  // use only the twilight times that occur within the time period of the hourly forecast container
  const upcomingTwilightTimes = relevantTwilightTimes.filter((time) => (time.dt > hourlyData[0].dt) && (time.dt < hourlyData[hourlyData.length - 1].dt));
  const hourlyDataWithTwilight = hourlyData.concat(upcomingTwilightTimes).sort((a, b) => a.dt - b.dt);

  function displayTimes(
    index: number,
    dt: number,
  ) {
    const timeString = index === 0 ? "NOW" : unixTimeToLocalTime(dt + timeZoneOffset)

    return (
      <p className="text-sm">
        {timeString.slice(0, timeString.length - 2)}<span className="text-xs">{timeString.slice(timeString.length - 2)}</span>
      </p>
    )
  }

  function displayProbOfPrecip(
    index: number,
    weatherId: number | undefined,
    probOfPrecip: number | undefined,
  ) {
    const PRECIP_CODE = ['2', '3', '5', '6'];

    // exclude the current weather and the sunrise/sunsets dataPoints that do not have weatherId and probOfPrecip
    if (index !== 0 && weatherId && probOfPrecip) {
      if (PRECIP_CODE.includes(weatherId.toString().charAt(0))) {
        return (
          <p className="text-xs text-sky-300">
            {`${Math.round(probOfPrecip * 10) * 10}%`}
          </p>
        )
      }
    }
  }
  
  function displayDescription(
    temp: number | undefined, 
    description: string
  ) {
    if (typeof(temp) === 'number') {
      return tempUnit === "C" ? `${kelvinToCelsius(temp)}\u00B0` : `${kelvintoFahrenheit(temp)}\u00B0`
    }
    else return description
  }

  return (
    <div className="w-full mx-auto sm:container rounded-2xl p-3 sm:px-4 backdrop-blur-md bg-gray-500/10 shadow-md">
      <h2 className="text-xs text-white/50 pb-0.5">HOURLY FORECAST</h2>
      <div className="flex gap-x-5 overflow-x-scroll text-white">
        {hourlyDataWithTwilight.map((dataPoint, index) => (
          <div key={dataPoint.dt} className="flex flex-col basis-10 shrink-0 justify-between items-center">
            <h3>
              {displayTimes(index, dataPoint.dt)}
            </h3>
            <div className="flex flex-col items-center justify-evenly">
              <Image
                src={`/${dataPoint.weather[0].icon}.svg`}
                alt={dataPoint.weather[0].description}
                width={35}
                height={35}
                />
                {displayProbOfPrecip(index, dataPoint.weather[0].id, dataPoint.pop)}
            </div>
            <p>
              {displayDescription(dataPoint.temp, dataPoint.weather[0].description)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
