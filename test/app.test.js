import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

describe('nameIsValid function', () => {
 const validCases = [
  {name: 'dudoser', expected: true},
  {name: 'fr', expected: true},
];

const invalidCases = [
  {name: 'x'},
  {name: 'Fr'},
  {name: 'eric cartman'},
  {name: null},
  {name: undefined},
  {name: ''},
  {name: 707},
  {name: null},
];

  test.each(validCases)('$name should be valid', ({ name }) => {
    expect(nameIsValid(name)).toBe(true);
  });

  test.each(invalidCases)('$name should be invalid', ({ name }) => {
    expect(nameIsValid(name)).toBe(false);
  });
});

describe('fullTrim function', () => {
  const returnEmptyString = [
    {input: null},
    {input: undefined},
    {input: ''}
  ]

  test('should remove all spaces from a string', () => {
    expect(fullTrim('h e l l o !')).toBe('hello!');
  });

  test.each(returnEmptyString)('should return empty string for $input', ({ input }) => {
    expect(fullTrim(input)).toBe('');
  });

  test('should return original string if there are no spaces', () => {
    expect(fullTrim('hello!')).toBe('hello!');
  });

  test('should remove whitespace characters with slashes', () => {
    expect(fullTrim(' he\nll\to ')).toBe('hello');
  });
});
