export const WeatherCodes = [
  { code: 0, label: "Clear sky", icon: "01" },

  { code: 1, label: "Mainly clear", icon: "02" },
  { code: 2, label: "Partly cloudy", icon: "03" },
  { code: 3, label: "Overcast", icon: "04" },

  { code: 45, label: "Fog", icon: "50" },
  { code: 48, label: "Depositing rime fog", icon: "50" },

  { code: 51, label: "Drizzle: Light", icon: "10" },
  { code: 53, label: "Drizzle: Moderate", icon: "10" },
  { code: 55, label: "Drizzle: Dense", icon: "10" },

  { code: 56, label: "Freezing Drizzle: Light", icon: "10" },
  { code: 57, label: "Freezing Drizzle: Dense", icon: "10" },

  { code: 61, label: "Rain: Slight", icon: "09" },
  { code: 63, label: "Rain: Moderate", icon: "09" },
  { code: 65, label: "Rain: Heavy", icon: "09" },

  { code: 66, label: "Freezing Rain: Light", icon: "09" },
  { code: 67, label: "Freezing Rain: Heavy", icon: "09" },

  { code: 71, label: "Snow fall: Slight", icon: "13" },
  { code: 73, label: "Snow fall: Moderate", icon: "13" },
  { code: 75, label: "Snow fall: Heavy", icon: "13" },

  { code: 77, label: "Snow grains", icon: "13" },

  { code: 80, label: "Rain showers: Slight", icon: "09" },
  { code: 81, label: "Rain showers: Moderate", icon: "09" },
  { code: 82, label: "Rain showers: Violent", icon: "09" },

  { code: 85, label: "Snow showers: Slight", icon: "13" },
  { code: 86, label: "Snow showers: Heavy", icon: "13" },

  { code: 95, label: "Thunderstorm: Slight or moderate", icon: "11" },
  { code: 96, label: "Thunderstorm with slight hail", icon: "11" },
  { code: 99, label: "Thunderstorm with heavy hail", icon: "11" },
  
  { code: -1, label: "Unknown", icon: "unknonwn_weather" },
] as const;