import 'dotenv/config';

interface Config {
  baseURL?: string;
  userId?: string;
  username?: string;
  password?: string;
}

const config: Config = Object.freeze({
  baseURL: process.env.BOOKSTORE_API_URL,
  userId: process.env.BOOKSTORE_USER_ID,
  username: process.env.BOOKSTORE_USERNAME,
  password: process.env.BOOKSTORE_PASSWORD
});

export default config;
