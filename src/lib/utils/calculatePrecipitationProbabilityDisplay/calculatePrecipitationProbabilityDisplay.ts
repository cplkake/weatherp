// returns the probability of precipitation as a percentage value only if the weatherId code matches 
export default function calculatePrecipitationProbabilityDisplay(
  probabilityOfPrecipitation: number,
  weatherId: number
): number {
  enum PrecipitationCode {
    Thunderstorm = "2",
    Drizzle = "3",
    Rain = "5",
    Snow = "6",
  }

  return Object.values<string>(PrecipitationCode).includes(weatherId.toString().charAt(0)) ? Math.round(probabilityOfPrecipitation * 10) * 10 : 0;
}