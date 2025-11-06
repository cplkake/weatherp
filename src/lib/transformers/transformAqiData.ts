import { getUsAqiDescription, getUsAqiDescriptor } from "../constants/usAqiCodes";
import { AirQualityResponse } from "../schemas/airQualitySchema";
import { AirQualityProps } from "@/types";

export default function transformAqiData(data: AirQualityResponse): AirQualityProps | null  {
  if (data) {
    const usAqi = data.current.us_aqi;

    return {
      overview: `${usAqi} - ${getUsAqiDescriptor(usAqi)}`,
      description: getUsAqiDescription(usAqi),
      displayValue: usAqi,
    };
  }

  return null;
}