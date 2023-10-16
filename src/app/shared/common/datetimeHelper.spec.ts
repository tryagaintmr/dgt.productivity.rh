import { DateTimeHelper } from "./datetimeHelper";


describe('DateTimeHelper', () => {
  it('should return month name', () => {
    const result = DateTimeHelper.getMonth('2022-01-01');
    expect(result).toEqual('Jan');
  });

  it('should return day', () => {
    const result = DateTimeHelper.getDay('2022-01-01');
    expect(result).toEqual(1);
  });

  it('should return year', () => {
    const result = DateTimeHelper.getYear('2022-01-01');
    expect(result).toEqual(2022);
  });

  it('should return time', () => {
    const result = DateTimeHelper.getTime('2022-01-01T10:30:00Z');
    expect(result).toEqual('10h30');
  });

  it('should format time with zero offset', () => {
    const result = DateTimeHelper.getTimeZeroOffset('2022-01-01T10:30:00Z');
    expect(result).toEqual('10:30:00');
  });
});
