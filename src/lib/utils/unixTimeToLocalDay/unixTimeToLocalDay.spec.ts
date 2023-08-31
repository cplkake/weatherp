import unixTimeToLocalDay from "./unixTimeToLocalDay";

describe('unixTimeToLocalDay test', () => {

  it('should convert the timestamp as of the writing of this test to Mon', () => {
    expect(unixTimeToLocalDay(1693247146))
    .toBe("Mon")
  });
  
  it('should convert the timestamp of May 04 2023 to Thu', () => {
    expect(unixTimeToLocalDay(1683239146))
    .toBe("Thu")
  });
  
  it('should convert the timestamp of Jan 28 2023 to Sat', () => {
    expect(unixTimeToLocalDay(1674948346))
    .toBe("Sat")
  });
});