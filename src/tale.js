function kolobok(name) {
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

console.log(kolobok('дедушка'));
console.log(kolobok('заяц'));
console.log(kolobok('лиса'));
console.log(kolobok('волк'));
