import { getRating, getMonthYearDate, capitalizeFirstLetter } from '.';

describe('Function: getRating', () => {
  it('should return 100%', () => {
    const fakeRating = 4.5;
    const result = getRating(fakeRating);

    expect(result).toBe('100%');
  });

  it('should return 60%', () => {
    const fakeRating = 3.1;
    const result = getRating(fakeRating);

    expect(result).toBe('60%');
  });
});

describe('Function: getMonthYearDate', () => {
  it('should return November 2023', () => {
    const result = getMonthYearDate('11-14-2023');

    expect(result).toBe('November 2023');
  });

  it('should return August 1990', () => {
    const result = getMonthYearDate('08.01.1990');

    expect(result).toBe('August 1990');
  });
});

describe('Function: capitalizeFirstLetter', () => {
  it('should return Cat', () => {
    const result = capitalizeFirstLetter('cat');

    expect(result).toBe('Cat');
  });

  it('should return Capitalize First Letter', () => {
    const result = capitalizeFirstLetter('capitalize First Letter');

    expect(result).toBe('Capitalize First Letter');
  });
});
