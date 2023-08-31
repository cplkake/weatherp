import { useEffect } from "react";
import { ResultsType } from "@/lib/types";

export default function useSuggestionsSearch(
  userInput: string,
  setSearchSuggestions: React.Dispatch<React.SetStateAction<ResultsType[]>>
) {
  // fetches suggestions from the location API if there is no input detected 0.5s after user has modified the search bar
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
}