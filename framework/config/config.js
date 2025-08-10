import 'dotenv/config';

export default Object.freeze({
  baseURL: process.env.BOOKSTORE_API_URL,
  userId: process.env.BOOKSTORE_USER_ID,
  username: process.env.BOOKSTORE_USERNAME,
  password: process.env.BOOKSTORE_PASSWORD
});
