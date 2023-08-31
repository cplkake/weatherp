import useSWR from "swr";
import { LocationCoords, FullData } from "@/lib/types";


export default function useWeatherSearch({ lat, lon }: LocationCoords) {
  const fetcher = async (apiUrl: string) => {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      throw error;
    }

    return res.json()
  };

  const { data, error, isLoading } = useSWR<FullData, Error>(
    `/api/weather?lat=${lat}&lon=${lon}`,
    fetcher
  );

  return {
    locationResults: data,
    isLoading,
    error,
  };
}
