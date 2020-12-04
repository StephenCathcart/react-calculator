import { calculateScore, generateOptions, isFormValid } from './Utils';

describe('Utils: calculateScore', () => {
  it('should return 100 if bed and sleep time match', () => {
    expect(calculateScore(5, 5)).toEqual(100);
  });

  it('should return 50 if sleep time is only half of bed time', () => {
    expect(calculateScore(10, 5)).toEqual(50);
  });

  it('should return 0 if bed time is zero to avoid divide by zero error', () => {
    expect(calculateScore(0, 10)).toEqual(0);
  });
});

describe('Utils: generateOptions', () => {
  const expectValidOption = (option, value, displayValue) => {
    expect(option.value).toBe(value)
    expect(option.displayValue).toBe(displayValue)
  }

  it('should return three options', () => {
    const options = generateOptions(0, 1);
    expect(options).toHaveLength(3);
    expectValidOption(options[0], 0, '0 Hour(s)');
    expectValidOption(options[1], 0.5, '0.5 Hour(s)');
    expectValidOption(options[2], 1, '1 Hour(s)');
  });
});

describe('Utils: isFormValid', () => {
  it('should return false if one select value is blank', () => {
    const selects = {
      a: { value: "a" },
      b: { value: "" }
    };
    expect(isFormValid(selects)).toBe(false);
  });

  it('should return false if all select values are blank', () => {
    const selects = {
      a: { value: "" },
      b: { value: "" }
    };
    expect(isFormValid(selects)).toBe(false);
  });

  it('should return true if all select values contain a value', () => {
    const selects = {
      a: { value: "a" },
      b: { value: "b" }
    };
    expect(isFormValid(selects)).toBe(true);
  });
});