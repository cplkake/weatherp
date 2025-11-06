import transformWeatherData from '@/lib/transformers/transformWeatherData';
import { 
  mockWeatherResponseClearDay,
  mockAirQualityResponseClean,
} from '@/tests/mock';


describe('transformWeatherData', () => {
  let clearDayData: typeof mockWeatherResponseClearDay;

  beforeEach(() => {
    // save the original daily object before each test
    clearDayData = structuredClone(mockWeatherResponseClearDay);
  });

  it('should transform valid data correctly', () => {
    const result = transformWeatherData(clearDayData, mockAirQualityResponseClean);

    expect(result).toMatchObject({
      current: {
        currentTemp: 14,
        todayHigh: 14,
        todayLow: 7,
        description: "Clear sky",
      },
    });
  });

  it('should return nulls if daily index is out of range', () => {
    // corrupt the daily array lengths
    clearDayData.daily!.temperature_2m_max = [];
    clearDayData.daily!.temperature_2m_min = [];

    const result = transformWeatherData(clearDayData, mockAirQualityResponseClean);

    expect(result).toMatchObject({
      current: {
        currentTemp: 14,
        todayHigh: null,
        todayLow: null,
      },
    });
  });

  // Add more edge cases as needed
});
