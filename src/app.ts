interface OrderItem {
  price: number;
  quantity: number;
  name?: string;
}

type ScoreRecord = Record<string, number>;

/**
 * Проверка имени пользователя
 */
export const nameIsValid = (name: any): boolean => typeof name === 'string' && name.length >= 2 && /^[a-z]+$/.test(name);

/**
 * Удаление пробелов из строки
 */
export const fullTrim = (text?: string | null): string => (text ?? '').replace(/\s+/g, '');

/**
 * Подсчёт суммы заказа
 * @throws Вернёт ошибку, если скидка не число и больше 99 или меньше 0
 * @example getTotal([{ price: 10, quantity: 10 }]) // 100
 * @example getTotal([{ price: 10, quantity: 1 }]) // 10
 * @example getTotal([{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }]) // 100
 * @example getTotal([{ price: 10, quantity: 0 }, { price: 10, quantity: 9 }]) // 90
 * @example getTotal([{ price: 10, quantity: 10 }], 10) // 90
 * @example getTotal([{ price: 10, quantity: 10 }], 100) // throws 'Процент скидки должен быть от 0 до 99'
 */
export const getTotal = (items: OrderItem[] = [], discount: any = 0): number => {
  if (typeof discount !== 'number') {
    throw new Error('Скидка должна быть числом');
  }
  if (discount < 0 || discount >= 100) {
    throw new Error('Процент скидки должен быть от 0 до 99');
  }

  const total = items.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
  return total * (1 - discount / 100);
};

/**
 * Подсчёт общего количества очков
 * @throws {TypeError} Вернёт ошибку, если был передан не объект
 * @throws {TypeError} Вернёт ошибку, если объект содержит что-то, кроме чисел
 */
export const getScore = (scores: any): number => {
  if (typeof scores !== 'object' || scores === null || Array.isArray(scores)) {
    throw new TypeError('Argument is not an object');
  }

  let totalScore = 0;

  for (const score in scores) {
    if (typeof scores[score] !== 'number' || Number.isNaN(scores[score])) {
      throw new TypeError('The object must only contain numbers');
    }
    totalScore += scores[score];
  }

  return totalScore;
};
