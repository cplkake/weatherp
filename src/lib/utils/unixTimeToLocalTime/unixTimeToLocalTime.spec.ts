import unixTimeToLocalTime from "./unixTimeToLocalTime";

describe('unixTimeToLocalDay test', () => {

  it('should convert the timestamp to 6:10PM', () => {
    expect(unixTimeToLocalTime(1693246200))
    .toBe("6:10PM")
  });
  
  it('should convert the timestamp to 4:20PM', () => {
    expect(unixTimeToLocalTime(1693239600))
    .toBe("4:20PM")
  });
  
  it('should convert the timestamp to 8AM', () => {
    expect(unixTimeToLocalTime(1693209600))
    .toBe("8AM")
  });
  
  it('should convert the timestamp to 12AM', () => {
    expect(unixTimeToLocalTime(1693267200))
    .toBe("12AM")
  });
});