import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import useWeatherSearch from "@/hooks/useWeatherSearch";
import CommandPalette from "@/components/commandPalette";
import SearchBar from "@/components/searchBar";
import CurrentWeatherContainer from "@/components/currentWeatherContainer";
import HourlyWeatherContainer from "@/components/hourlyWeatherContainer";
import DailyWeatherContainer from "@/components/dailyWeatherContainer";
import AirQualityContainer from "@/components/airQualityContainer";
import FeelsLikeContainer from "@/components/feelsLikeContainer";
import HumidityContainer from "@/components/humidityContainer";
import TempUnitSelector from "@/components/tempUnitSelector";

const inter = Inter({ subsets: ["latin"] });

type ResultsType = {
  name: string;
  local_names?: { [key: string]: string };
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

type Location = {
  lat: number;
  lon: number;
  name: string;
  country: string
};

type TempUnits = "C" | "F";

interface HourlyWeather {
  dt: number;
  temp?: number;
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
}

export default function Home() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<ResultsType[]>([]);
  const [targetLocation, setTargetLocation] = useState<Location>({
    lat: 51.0460954,
    lon: -114.065465,
    name: "Calgary",
    country: "CA",
  });
  const [tempUnit, setTempUnit] = useState<TempUnits>("C");
  const { locationResults, isLoading, isError } = useWeatherSearch({
    lat: targetLocation.lat,
    lon: targetLocation.lon,
  });
  
  const backgroundColorValues = {
    midnight: {
      bottom: "2c3e5a",
      middle: "20233c",
      top: "101124",
    },
    twilight: {
      bottom: "c0848e",
      middle: "717399",
      top: "20416d",
    },
    midday: {
      bottom: "78afde",
      middle: "4c8cbf",
      top: "256292",
    },
  };

  const handleSearchBarClick = (e: React.MouseEvent) => {
    setIsPaletteOpen(true);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

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

    // console.log('start color: '+startColor)
    // console.log('end color: '+endColor)

    if (startColorArray && endColorArray) {
      for (let i = 0; i < 3; i++) {
        // console.log(parseInt(startColorArray[i], 16))
        // console.log(parseInt(endColorArray[i], 16))
        // console.log(color)
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
        // console.log(Math.ceil(calculateGradient(startTime, endTime, currentTime, parseInt(startColorArray[i], 16), parseInt(endColorArray[i], 16))).toString(16))
      }
      // console.log('color: '+color)
      return color;
    } 
    else return "000";
  }

  function calculateColor(position: "bottom" | "middle" | "top") {
    const locationSunrise = locationResults.weather.current.sunrise;
    const locationSunset = locationResults.weather.current.sunset;
    const currentTime = locationResults.weather.current.dt;
    // const prefix = position === "bottom" ? "from" : position === "middle" ? "via" : "to";

    if (currentTime <= locationSunrise) {
      const breakOfDawn = locationSunrise - 7200;
      console.log('current time: '+currentTime)
      console.log('break of dawn: '+breakOfDawn)
      console.log('location sunrise: ' + locationSunrise)
      if (currentTime >= breakOfDawn) {
        const startColor = backgroundColorValues.midnight[position];
        const endColor = backgroundColorValues.twilight[position];
        const hexCode = calculateHex(
          startColor,
          endColor,
          breakOfDawn,
          locationSunrise,
          currentTime
        );
        // console.log(prefix)
        // console.log(hexCode)
        return `#${hexCode}`;
      } 
      else return `#${backgroundColorValues.midnight[position]}`;
    } else if (currentTime <= locationSunset) {
      const sunShineTime = locationSunrise + 3600;
      const breakOfDusk = locationSunset - 3600;
      if (currentTime <= sunShineTime) {
        const startColor = backgroundColorValues.twilight[position];
        const endColor = backgroundColorValues.midday[position];
        const hexCode = calculateHex(
          startColor,
          endColor,
          locationSunrise,
          sunShineTime,
          currentTime
        );
        // console.log(prefix)
        // console.log(hexCode)
        return `#${hexCode}`;
      }
      if (currentTime >= breakOfDusk) {
        const startColor = backgroundColorValues.midday[position];
        const endColor = backgroundColorValues.twilight[position];
        const hexCode = calculateHex(
          startColor,
          endColor,
          breakOfDusk,
          locationSunset,
          currentTime
        );
        // console.log(prefix)
        // console.log(hexCode)
        return `#${hexCode}`;
      } 
      else return `#${backgroundColorValues.midday[position]}`;
    } else {
      const darknessTime = locationSunset + 3600;
      // console.log('current time: '+currentTime)
      // console.log('darkness time: '+darknessTime)
      // console.log('location sunset: ' + locationSunset)
      if (currentTime <= darknessTime) {
        const startColor = backgroundColorValues.twilight[position];
        const endColor = backgroundColorValues.midnight[position];
        const hexCode = calculateHex(
          startColor,
          endColor,
          locationSunset,
          darknessTime,
          currentTime
        );
        // console.log(prefix)
        // console.log(hexCode)
        return `#${hexCode}`;
      } 
      else return `#${backgroundColorValues.midnight[position]}`;
    }
  }

  function loadRelevantTwilightTimes(): HourlyWeather[] {
    return [
      {
        dt: locationResults.weather.current.sunrise,
        weather: [{
          description: 'Sunrise',
          icon: 'sunrise',
        }],
      },
      {
        dt: locationResults.weather.current.sunset,
        weather: [{
          description: 'Sunset',
          icon: 'sunset',
        }],
      },
      {
        dt: locationResults.weather.daily[1].sunrise,
        weather: [{
          description: 'Sunrise',
          icon: 'sunrise',
        }],
      },
      {
        dt: locationResults.weather.daily[1].sunset,
        weather: [{
          description: 'Sunset',
          icon: 'sunset',
        }],
      },
    ]
  }

  // fetch suggestions if there is no input detected 0.5s after user has modified the search bar
  useEffect(() => {
    if (userInput) {
      const delayDebounce = setTimeout(() => {
        fetch(`/api/location?search=${userInput}`)
          .then((res) => res.json())
          .then((data) => setSearchSuggestions(data));
      }, 500);

      return () => clearTimeout(delayDebounce);
    }
    setSearchSuggestions([]);
  }, [userInput]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Head>
        <title>Weather</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CommandPalette
        displayText={userInput}
        onChange={handleInput}
        searchSuggestions={searchSuggestions}
        setTargetLocation={setTargetLocation}
        isOpen={isPaletteOpen}
        setIsOpen={setIsPaletteOpen}
      />
      <div
        className="inset-0 fixed overflow-hidden"
        style={{
          background: `linear-gradient(to top, ${calculateColor('bottom')}, ${calculateColor('middle')} 40%, ${calculateColor('top')})`
        }}
      >
        <main
          className={`flex flex-col gap-y-16 items-center py-16 overflow-auto max-h-screen`}
        >
          <SearchBar displayText={userInput} handleClick={handleSearchBarClick} />
          <div className="flex gap-4">
            <CurrentWeatherContainer
              tempUnit={tempUnit}
              location={targetLocation.name}
              currentTemp={locationResults.weather.current.temp}
              description={locationResults.weather.current.weather[0].description}
              todayHigh={locationResults.weather.daily[0].temp.max}
              todayLow={locationResults.weather.daily[0].temp.min}
            />
            <TempUnitSelector
              tempUnit={tempUnit}
              setTempUnit={setTempUnit}
            />
          </div>
          <div className="w-5/6 max-w-3xl flex flex-col gap-y-3">
            <HourlyWeatherContainer
              tempUnit={tempUnit}
              timeZoneOffset={locationResults.weather.timezone_offset}
              currentTime={locationResults.weather.current.dt}
              hourlyData={locationResults.weather.hourly.slice(0, 25)}
              relevantTwilightTimes={loadRelevantTwilightTimes()}
            />
            <DailyWeatherContainer
              tempUnit={tempUnit}
              timeZoneOffset={locationResults.weather.timezone_offset}
              dailyData={locationResults.weather.daily}
            />
            <AirQualityContainer
              airQualityData={locationResults.airQuality}
            />
            <div className="grid grid-cols-2 grid-rows-1 gap-x-3">
              <FeelsLikeContainer
                tempUnit={tempUnit}
                currentTemp={locationResults.weather.current.temp}
                feelsLikeData={locationResults.weather.current.feels_like}
              />
              <HumidityContainer
                tempUnit={tempUnit}
                humidityData={locationResults.weather.current.humidity}
                dewPointData={locationResults.weather.current.dew_point}
              />
            </div>
            <div className="text-center mt-2">
              <h3 className="text-white text-sm">{`Weather for ${targetLocation.name}, ${targetLocation.country}`}</h3>
              <p className="text-white/50 text-xs">Powered by <a href="https://openweathermap.org/" className="underline">OpenWeather</a></p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
