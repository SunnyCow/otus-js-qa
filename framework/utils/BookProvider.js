import booksJson from '../fixtures/books.json';

const getAll = () => booksJson.books;

const getRange = (start, end) => booksJson.books.slice(start, end);

const getIsbns = (num) => booksJson.books.slice(0, num).map((book) => book.isbn);

const getRandomIsbn = () => {
  const isbns = booksJson.books.map((book) => book.isbn);
  const index = Math.floor(Math.random() * isbns.length);
  return isbns[index];
};

export default { getAll, getRange, getIsbns, getRandomIsbn };
