import useSWR from "swr";

// TODO: extract both type and interface in corresponding folders to have a looser coupling
type LocationCoords = {
  lat: number;
  lon: number;
};

interface Weather {
  dt: number;
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

interface HourlyWeather extends Weather {
  temp: number;
}

interface DailyWeather extends Weather {
  sunrise: number;
  sunset: number;
  temp: {
    min: number;
    max: number;
  };
}

interface WeatherData {
  lat: number;
  lon: number;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    humidity: number;
    dew_point: number;
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
  };
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

interface AirQualityData {
  coord: {
    lat: number;
    lon: number;
  };
  list: [
    {
      dt: number;
      main: {
        aqi: 1 | 2 | 3 | 4 | 5;
      };
      components: {
        co: number;
        no: number;
        no2: number;
        o3: number;
        s02: number;
        pm2_5: number;
        pm10: number;
        nh3: number;
      }
    }
  ]
}

interface FullData {
  weather: WeatherData;
  airQuality: AirQualityData;
}

export default function useWeatherSearch({ lat, lon }: LocationCoords) {
  const fetcher = async (apiUrl: string) => {
    // TODO: missing semicolon
    const res = await fetch(apiUrl)

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      throw error;
    }

    return res.json()
  };

  const { data, error, isLoading } = useSWR(
    `/api/weather?lat=${lat}&lon=${lon}`,
    fetcher
  );

  return {
    locationResults: data as FullData,
    isLoading,
    error,
  };
}
