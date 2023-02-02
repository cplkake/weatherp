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
  const { locationResults, isLoading, error } = useWeatherSearch({
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
  const borderColor = error ? 'border border-red-600' : '';

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
      const breakOfDawn = locationSunrise - 3400;
      // console.log('current time: '+currentTime)
      // console.log('break of dawn: '+breakOfDawn)
      // console.log('location sunrise: ' + locationSunrise)
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

  function loadErrorMessage() {
    if (error) {
      return (
        <div className="absolute bg-red-600 text-white text-sm -top-0 rounded-b-md px-2">
        Error. Please try again
      </div>
      )
    }
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

  return isLoading ? (
    <div 
      className="inset-0 fixed overflow-hidden flex items-center justify-center"
      style={{
        background: `linear-gradient(to top, #${backgroundColorValues.midday.bottom}, #${backgroundColorValues.midday.middle} 40%, #${backgroundColorValues.midday.top})`
      }}
    >
      <svg aria-hidden="true" className="w-8 h-8 mr-2 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="rgb(0 0 0 / 0.2)"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white"/>
      </svg>
    </div>
  ): (
    <>
      <Head>
        <title>Weatherp</title>
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
          className={`flex flex-col gap-y-16 items-center py-16 overflow-auto max-h-screen ${borderColor}`}
          >
          {loadErrorMessage()}
          <SearchBar displayText={userInput} handleClick={handleSearchBarClick} />
          <CurrentWeatherContainer
            tempUnit={tempUnit}
            setTempUnit={setTempUnit}
            location={targetLocation.name}
            currentTemp={locationResults.weather.current.temp}
            description={locationResults.weather.current.weather[0].description}
            todayHigh={locationResults.weather.daily[0].temp.max}
            todayLow={locationResults.weather.daily[0].temp.min}
          />
          <div className="w-11/12 max-w-3xl flex flex-col gap-y-3">
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
              <h2 className="text-white text-sm">{`Weather for ${targetLocation.name}, ${targetLocation.country}`}</h2>
              <p className="text-white/50 text-xs">Powered by <a href="https://openweathermap.org/" className="underline">OpenWeather</a></p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
