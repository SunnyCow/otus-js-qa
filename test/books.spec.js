import generateUserCredentials from '../framework/fixtures/userFixture';
import createAndAuthUser from '../framework/utils/createAndAuthUser';
import BookService from '../framework/services/BookService';
import booksJson from '../framework/fixtures/books.json';

describe('Bookstore API - bookstore tests', () => {
  const isbnsArray = [
    [booksJson.books.slice(0, 1).map((book) => book.isbn)],
    [booksJson.books.slice(1, 3).map((book) => book.isbn)]
  ];

  test.each(isbnsArray)('should add books %s', async (isbns) => {
    const { userResponse, tokenResponse } = await createAndAuthUser(generateUserCredentials());
    const userId = userResponse.data.userID;
    const token = tokenResponse.data.token;
    const body = {
      userId,
      isbns,
      token
    };

    const response = await BookService.addBooks(body);

    expect(response.data).toEqual({ books: isbns.map((isbn) => ({ isbn })) });
  });
});
