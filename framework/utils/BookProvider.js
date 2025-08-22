import booksJson from '../fixtures/books.json';

const getAll = () => booksJson.books;

const getRange = (start, end) => booksJson.books.slice(start, end);

const getRandomIsbn = () => {
  const isbns = booksJson.books.map((book) => book.isbn);
  const index = Math.floor(Math.random() * isbns.length);
  return isbns[index];
};

export default { getAll, getRange, getRandomIsbn };
