function kolobok(name: string) {
  switch (name.toLowerCase()) {
    case 'дедушка':
      return 'Я от дедушки ушёл ^_^';
    case 'заяц':
      return 'Я от зайца ушёл ^_^';
    case 'лиса':
      return 'Меня съели х_х';
    default:
      return `Тебя, ${name}, не знаю :P`;
  }
}

function newYear(name: string) {
  switch (name.toLowerCase()) {
    case 'дед мороз':
    case 'снегурочка':
      return `${name}! ${name}! ${name}!`;
    default:
      return `Тебя, ${name}, не знаю :P`;
  }
}

console.log('\n');
console.log(`kolobok() function
------------------`);
console.log(kolobok('дедушка'));
console.log(kolobok('заяц'));
console.log(kolobok('лиса'));
console.log(kolobok('волк'));

console.log('\n');

console.log(`newYear() function
------------------`);
console.log(newYear('Дед Мороз'));
console.log(newYear('Снегурочка'));
