import BookService from '../framework/services/BookService';
import UserService from '../framework/services/UserService';
import createAndAuthUser from '../framework/utils/createAndAuthUser';
import BookProvider from '../framework/utils/BookProvider';

describe('Bookstore API - bookstore tests', () => {
  const isbnsArray = [
    [BookProvider.getRange(0, 1).map((book) => book.isbn)],
    [BookProvider.getRange(1, 3).map((book) => book.isbn)]
  ];

  test.each(isbnsArray)('should add books %s', async (isbns) => {
    const { userResponse, tokenResponse } = await createAndAuthUser();
    const userId = userResponse.data.userID;
    const token = tokenResponse.data.token;

    const response = await BookService.add({ userId, isbns, token });

    expect(response.data).toEqual({ books: isbns.map((isbn) => ({ isbn })) });
  });

  test('should replace book', async () => {
    const { userResponse, tokenResponse } = await createAndAuthUser();
    const userId = userResponse.data.userID;
    const token = tokenResponse.data.token;

    const [book1, book2] = BookProvider.getAll();
    const isbn = book1.isbn;
    const replaceIsbn = book2.isbn;

    await BookService.add({ userId, token, isbns: isbn });

    const response = await BookService.replace({ isbn, replaceIsbn, userId, token });

    expect(response.data).toEqual({
      books: [book2],
      userId,
      username: userResponse.data.username
    });

    const userData = await UserService.get({ userId, token });
    const userBooks = userData.data.books.map((b) => b.isbn);

    expect(userBooks).toContain(replaceIsbn);
    expect(userBooks).not.toContain(isbn);
  });

  test('should find books by isbn', async () => {
    const isbn = BookProvider.getRandomIsbn();
    const response = await BookService.get({ isbn });

    expect(response.status).toBe(200);
    expect(response.data.isbn).toEqual(isbn);
  });

  test('should return 400 if the book is not found', async () => {
    const response = await BookService.get({ isbn: 1111 });

    expect(response.status).toBe(400);
    expect(response.data.message).toMatch(/ISBN supplied is not/);
  });

  test('should delete one book from user collection', async () => {
    const { userResponse, tokenResponse } = await createAndAuthUser();
    const userId = userResponse.data.userID;
    const token = tokenResponse.data.token;
    const isbn = BookProvider.getRandomIsbn();

    await BookService.add({ userId, token, isbns: isbn });

    let userData = await UserService.get({ userId, token });

    expect(userData.data.books.map((b) => b.isbn)).toContain(isbn);

    const removeResponse = await BookService.removeOne({ isbn, userId, token });
    userData = await UserService.get({ userId, token });

    expect(removeResponse.data).toEqual('');
    expect(removeResponse.status).toBe(204);
    expect(userData.data.books.map((b) => b.isbn)).not.toContain(isbn);
  });

  test('should delete all books from user collection', async () => {
    const { userResponse, tokenResponse } = await createAndAuthUser();
    const userId = userResponse.data.userID;
    const token = tokenResponse.data.token;
    const isbns = BookProvider.getIsbns(5);

    await BookService.add({ userId, token, isbns: isbns });

    let userData = await UserService.get({ userId, token });

    expect(userData.data.books.map((b) => b.isbn)).toEqual(expect.arrayContaining(isbns));

    const removeResponse = await BookService.removeAll({ userId, token });

    userData = await UserService.get({ userId, token });

    expect(removeResponse.data).toEqual('');
    expect(removeResponse.status).toBe(204);
    expect(userData.data.books).toEqual([]);
  });
});
