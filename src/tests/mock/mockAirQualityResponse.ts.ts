import { AirQualityResponse } from "@/lib/schemas/airQualitySchema";

export const mockAirQualityResponseClean: AirQualityResponse = {
  current: { 
    time: 1760982300, 
    interval: 900, 
    us_aqi: 12
  },
};

export const mockAirQualityResponseModerate: AirQualityResponse = {
  current: { 
    time: 1760982300, 
    interval: 900, 
    us_aqi: 81 
  },
};

export const mockAirQualityResponseHazardous: AirQualityResponse = {
  current: { 
    time: 1760982300, 
    interval: 900, 
    us_aqi: 320 
  },
};
