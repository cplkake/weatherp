export interface Weather {
  dt: number;
  weather: [
    {
      id?: number;
      main?: string;
      description: string;
      icon: string;
    }
  ];
  pop?: number;
}

export type HourlyData = HourlyWeather | TwilightTime;

export interface HourlyWeather {
  dt: number;
  temp: number;
  weather: [
    {
      id: number;
      description: string;
      icon: string;
    }
  ];
  pop: number;
}

export interface TwilightTime {
  dt: number;
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
}

export interface DailyWeather {
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

export interface UIReadyDailyData {
  dt: number;
  timeString: string;
  temp: {
    min: number;
    max: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  pop: number;
}

export type UIReadyHourlyData = UIReadyHourlyWeather | UIReadyTwilightTime;

export interface UIReadyHourlyWeather {
  dt: number;
  timeString: string;
  temp: number;
  weather: {
    id: number;
    description: string;
    icon: string;
  };
  pop: number;
}

export interface UIReadyTwilightTime {
  dt: number;
  timeString: string;
  weather: {
    description: string;
    icon: string;
  };
}

export interface WeatherData {
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

export interface AirQualityData {
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

export interface FullData {
  weather: WeatherData;
  airQuality: AirQualityData;
}

export interface UITextDisplay {
  overview: string;
  description: string;
}

export interface UITextAndVisualDisplay {
  overview: string;
  description: string;
  displayValue: number;
}

export interface UIReadyData {
  backgroundColorData: BackgroundColors;
  currentWeatherData: CurrentWeather | undefined;
  dailyWeatherData: DailyWeatherOverview | undefined;
  hourlyWeatherData: UIReadyHourlyData[] | undefined;
  airQualityData: UITextAndVisualDisplay | undefined;
  feelsLikeData: UITextDisplay | undefined;
  humidityData: UITextDisplay | undefined;
}

export interface AirQualityDescription {
  title: string;
  paragraph: string;
}

export type ResultsType = {
  name: string;
  local_names?: { [key: string]: string };
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

export type Location = {
  lat: number;
  lon: number;
  name: string;
  country: string
};

export type LocationCoords = {
  lat: number;
  lon: number;
};

export type CurrentWeather = {
  currentTemp: number;
  description: string;
  todayHigh: number;
  todayLow: number;
}

export type DailyWeatherOverview = {
  weekTemperature: TemperatureRange;
  dailyData: UIReadyDailyData[];
}

export type TemperatureRange = {
  low: number;
  high: number;
}

export type BackgroundColors = {
  TOP: string,
  MIDDLE: string,
  BOTTOM: string,
}

export type ColorCalculator = (
  startColors: BackgroundColors,
  endColors: BackgroundColors,
  startTime: number,
  endTime: number,
  currentTime: number
) => BackgroundColors;

export enum TempUnits {
  Celsius = "C",
  Fahrenheit = "F",
}

export enum WindowPositions {
  Top = "TOP",
  Middle = "MIDDLE",
  Bottom = "BOTTOM"
}

export enum PeriodOfDay {
  Night,
  PreSunriseDawn,
  PostSunriseDawn,
  Day,
  PreSunsetDusk,
  PostSunsetDusk
}