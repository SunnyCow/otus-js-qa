import { Book } from 'types';
import booksJson from '../fixtures/books.json';

const getAll = () => booksJson.books;

const getRange = (start: number, end: number) => booksJson.books.slice(start, end);

const getIsbns = (num: number) => booksJson.books.slice(0, num).map((book: Book) => book.isbn);

const getRandomIsbn = () => {
  const isbns = booksJson.books.map((book: Book) => book.isbn);
  const index = Math.floor(Math.random() * isbns.length);
  return isbns[index];
};

export default {
  getAll,
  getRange,
  getIsbns,
  getRandomIsbn
};
