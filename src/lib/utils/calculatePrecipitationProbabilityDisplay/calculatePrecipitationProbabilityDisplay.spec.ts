import calculatePrecipitationProbabilityDisplay from "./calculatePrecipitationProbabilityDisplay";

describe('precipitation probability test', () => {

  it('should return 60 given the probability value and weather code for drizzle', () => {
    expect(calculatePrecipitationProbabilityDisplay(0.56, 302))
    .toBe(60)
  })
  
  it('should return 80 given the probability value and weather code for thunderstorm', () => {
    expect(calculatePrecipitationProbabilityDisplay(0.96, 211))
    .toBe(100)
  })
  
  it('should return 60 given the probability value and weather code for rain', () => {
    expect(calculatePrecipitationProbabilityDisplay(0.68, 502))
    .toBe(70)
  })
  
  it('should return 60 given the probability value and weather code for snow', () => {
    expect(calculatePrecipitationProbabilityDisplay(0.63, 600))
    .toBe(60)
  })
  
  it('should return 0 given the probability value and weather code for clouds', () => {
    expect(calculatePrecipitationProbabilityDisplay(0.34, 802))
    .toBe(0)
  })
})