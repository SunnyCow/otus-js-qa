import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

describe('nameIsValid function', () => {

  const validCases = ['dudoser', 'fr'];

  const invalidCases = ['x', 'Fr', 'eric cartman', null, undefined, ' ', '', 707];

  test.each(validCases)('"%s" should be valid', (name) => {
    expect(nameIsValid(name)).toBe(true);
  });

  test.each(invalidCases)('"%s" should be invalid', (name) => {
    expect(nameIsValid(name)).toBe(false);
  });
});

describe('fullTrim function', () => {
  const returnEmptyString = [null, undefined, ''];

  test('should remove all spaces from a string', () => {
    expect(fullTrim('h e l l o !')).toBe('hello!');
  });

  test.each(returnEmptyString)('should return empty string for "%s"', (input) => {
    expect(fullTrim(input)).toBe('');
  });

  test('should return original string if there are no spaces', () => {
    expect(fullTrim('hello!')).toBe('hello!');
  });

  test('should remove whitespace characters with slashes', () => {
    expect(fullTrim(' he\nll\to ')).toBe('hello');
  });
});
