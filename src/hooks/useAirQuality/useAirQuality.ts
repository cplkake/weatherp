import {
  FullData,
  AirQualityDescription,
  UITextAndVisualDisplay,
} from "@/lib/types";


export default function useAirQuality(
  retrievedData: FullData | undefined,
): UITextAndVisualDisplay | undefined {
  if (retrievedData) {
    const [airQualityData] = retrievedData.airQuality.list;
    const airQualityIndex = airQualityData.main.aqi;
  
    const uiReadyAirQualityOverview = `${airQualityIndex} - ${airQualityDescription[airQualityIndex].value.title}`;
    const uiReadyAirQualityDescription = `Air quality is ${airQualityDescription[airQualityIndex].value.paragraph} today.`
    const displayValue = (airQualityIndex - 1) / 4 * 100;
  
    return {
      overview: uiReadyAirQualityOverview,
      description: uiReadyAirQualityDescription,
      displayValue
    };
  }
}

class airQualityDescription {
  static readonly 1 = new airQualityDescription('1', { 
    title: "Very Low Health Risk",
    paragraph: "good",
  });
  static readonly 2 = new airQualityDescription('2', { 
    title: "Low Health Risk",
    paragraph: "fair",
  });
  static readonly 3 = new airQualityDescription('3', { 
    title: "Medium Health Risk",
    paragraph: "moderate",
  });
  static readonly 4 = new airQualityDescription('4', { 
    title: "High Health Risk",
    paragraph: "poor",
  });
  static readonly 5 = new airQualityDescription('5', { 
    title: "Very High Health Risk",
    paragraph: "very poor",
  });

  private constructor(private readonly key: string, public readonly value: AirQualityDescription) {
  }

  toString() {
    return this.key;
  }
}