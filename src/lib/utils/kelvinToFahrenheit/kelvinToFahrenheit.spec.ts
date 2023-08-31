import kelvinToFahrenheit from "./kelvinToFahrenheit";

describe('kelvinToFahrenheit test', () => {

  it('should convert correctly from kelvin to degrees fahrenheit', () => {
    expect(kelvinToFahrenheit(0))
    .toBe(-460)
  });

  it('should convert the boiling point of water correctly from kelvin to degrees fahrenheit', () => {
    expect(kelvinToFahrenheit(373.15))
    .toBe(212)
  });
});