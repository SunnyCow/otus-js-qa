import createAndAuthUser from '../framework/utils/createAndAuthUser';
import BookService from '../framework/services/BookService';
import booksJson from '../framework/fixtures/books.json';
import UserService from '../framework/services/UserService';

describe('Bookstore API - bookstore tests', () => {
  const isbnsArray = [
    [booksJson.books.slice(0, 1).map((book) => book.isbn)],
    [booksJson.books.slice(1, 3).map((book) => book.isbn)]
  ];

  test.each(isbnsArray)('should add books %s', async (isbns) => {
    const { userResponse, tokenResponse } = await createAndAuthUser();
    const userId = userResponse.data.userID;
    const token = tokenResponse.data.token;
    const body = {
      userId,
      isbns,
      token
    };

    const response = await BookService.add(body);

    expect(response.data).toEqual({ books: isbns.map((isbn) => ({ isbn })) });
  });

  test('should replace book', async () => {
    const { userResponse, tokenResponse } = await createAndAuthUser();
    const userId = userResponse.data.userID;
    const token = tokenResponse.data.token;

    const [book1, book2] = booksJson.books;
    const isbn = book1.isbn;
    const replaceIsbn = book2.isbn;

    await BookService.add({ userId, token, isbns: [isbn] });

    const response = await BookService.replace({ isbn, replaceIsbn, userId, token });

    expect(response.data).toEqual({
      books: [book2],
      userId,
      username: userResponse.data.username
    });

    const userData = await UserService.get(userId, token);
    const userBooks = userData.data.books.map((b) => b.isbn);

    expect(userBooks).toContain(replaceIsbn);
    expect(userBooks).not.toContain(isbn);
  });
});
