import { nameIsValid, fullTrim, getTotal, getScore } from '../src/app';

describe('nameIsValid function', () => {
  const validCases = ['dudoser', 'fr'];
  const invalidCases = ['x', 'Fr', 'eric cartman', null, undefined, ' ', '', 707];

  test.each(validCases)('"%s" should be valid', (name: unknown) => {
    expect(nameIsValid(name)).toBe(true);
  });

  test.each(invalidCases)('"%s" should be invalid', (name: unknown) => {
    expect(nameIsValid(name)).toBe(false);
  });
});

describe('fullTrim function', () => {
  const returnEmptyString = [null, undefined, ''];

  test('should remove all spaces from a string', () => {
    expect(fullTrim('h e l l o !')).toBe('hello!');
  });

  test.each(returnEmptyString)('should return empty string for "%s"', (input: null|undefined|string) => {
    expect(fullTrim(input)).toBe('');
  });

  test('should return original string if there are no spaces', () => {
    expect(fullTrim('hello!')).toBe('hello!');
  });

  test('should remove whitespace characters with slashes', () => {
    expect(fullTrim(' he\nll\to ')).toBe('hello');
  });
});

describe('getTotal function', () => {
  const nonNumericDiscounts = [null, '10'];

  test('should count total without discount', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 4 }
    ];
    expect(getTotal(items)).toBe(10 * 2 + 5 * 4);
  });

  test('should count total for a single item without discount', () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(getTotal(items)).toBe(10 * 2);
  });

  test('should appy disout', () => {
    const items = [{ price: 10, quantity: 10 }];
    expect(getTotal(items, 20)).toBe(80);
  });

  test('should throw an error if discount is 100%', () => {
    expect(() => getTotal([{ price: 100, quantity: 1 }], 100)).toThrow('Процент скидки должен быть от 0 до 99');
  });

  test('should throw error if discount is negative', () => {
    expect(() => getTotal([{ price: 10, quantity: 1 }], -10)).toThrow('Процент скидки должен быть от 0 до 99');
  });

  test('should handle quantity 0 correctly', () => {
    const items = [{ price: 10, quantity: 0 }];
    expect(getTotal(items)).toBe(0);
  });

  test.each(nonNumericDiscounts)('should throw error if discount is non-numeric: %p', (input: unknown) => {
    expect(() => getTotal([{ price: 10, quantity: 1 }], input)).toThrow('Скидка должна быть числом');
  });
});

describe('getScore function', () => {
  const nonObjectInput = [null, NaN, undefined, 'score', 777, []];
  const invalidObjects = [
    { Rory: 50, Rose: null },
    { Alexander: NaN, Skeleton: 666 },
    { Chipi: 21, Chapa: 'string' },
    { Beaver: 33, Squirrel: undefined },
    { Mulder: 27, Skully: [] }
  ];

  test('should retrun sum of scores when provided valid object', () => {
    const scores = {
      Alice: 50,
      Slash: 28,
      Rainbow: 55
    };
    expect(getScore(scores)).toBe(50 + 28 + 55);
  });

  test.each(nonObjectInput)('should throw an error if input is not an object: %p', (input: unknown) => {
    expect(() => getScore(input)).toThrow(TypeError('Argument is not an object'));
  });

  test.each(invalidObjects)('should throw an error if object contains values other than numbers: %p', (input: unknown) => {
    expect(() => getScore(input)).toThrow(TypeError('The object must only contain numbers'));
  });
});
