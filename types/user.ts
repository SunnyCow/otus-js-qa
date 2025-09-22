import { Book } from '../types/book';

export interface User {
  userID: string;
  username: string;
  books: Book[];
  message?: string;
}

export interface AuthToken {
  token: string;
  expires: string;
  message: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}
