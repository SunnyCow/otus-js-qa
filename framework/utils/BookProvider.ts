import booksJson from '../fixtures/books.json';

const getAll = () => booksJson.books;

const getRange = (start: any, end: any) => booksJson.books.slice(start, end);

const getIsbns = (num: any) => booksJson.books.slice(0, num).map((book: any) => book.isbn);

const getRandomIsbn = () => {
  const isbns = booksJson.books.map((book: any) => book.isbn);
  const index = Math.floor(Math.random() * isbns.length);
  return isbns[index];
};

export default {
  getAll,
  getRange,
  getIsbns,
  getRandomIsbn
};
