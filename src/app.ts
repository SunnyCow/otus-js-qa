interface OrderItem {
  price: number;
  quantity: number;
  name?: string;
}

/**
 * Проверка имени пользователя
 */
export const nameIsValid = (name: unknown): boolean =>
  typeof name === 'string' && name.length >= 2 && /^[a-z]+$/.test(name);

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
export const getTotal = (items: OrderItem[] = [], discount: unknown = 0): number => {
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
export const getScore = (scores: unknown): number => {
  if (typeof scores !== 'object' || scores === null || Array.isArray(scores)) {
    throw new TypeError('Argument is not an object');
  }
  const scoreObject = scores as Record<string, unknown>;

  let totalScore = 0;

  for (const key in scoreObject) {
    if (typeof scoreObject[key] !== 'number' || Number.isNaN(scoreObject[key])) {
      throw new TypeError('The object must only contain numbers');
    }
    totalScore += scoreObject[key];
  }

  return totalScore;
};
