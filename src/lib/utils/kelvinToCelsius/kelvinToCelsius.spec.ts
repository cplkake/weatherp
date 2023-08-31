import kelvinToCelsius from "./kelvinToCelsius";

describe('kelvinToCelsius test', () => {

  it('should convert correctly from kelvin to degrees celsius', () => {
    expect(kelvinToCelsius(0))
    .toBe(-273)
  });

  it('should convert the boiling point of water correctly from kelvin to degrees celsius', () => {
    expect(kelvinToCelsius(373.15))
    .toBe(100)
  });
});