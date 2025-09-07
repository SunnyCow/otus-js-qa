import httpClient from './HttpClient';
import type { ApiResponse, Book, AddBooksParams } from '../../types';

const BookService = {
  add: async ({ userId, isbns, token }: AddBooksParams): Promise<ApiResponse<Book[]>> => {
    const normalizedIsbns = Array.isArray(isbns) ? isbns : [isbns];

    const response = await httpClient.post(
      `/BookStore/v1/Books`,
      {
        userId,
        collectionOfIsbns: normalizedIsbns.map((isbn) => ({ isbn }))
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    return {
      headers: response.headers as Record<string, string>,
      status: response.status,
      data: response.data
    };
  },

  replace: async ({
    isbn,
    replaceIsbn,
    userId,
    token
  }: { isbn: string; replaceIsbn: string; userId: string; token: string }): Promise<ApiResponse<Book>> => {
    const response = await httpClient.put(
      `/BookStore/v1/Books/${isbn}`,
      {
        userId,
        isbn: replaceIsbn
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    return {
      headers: response.headers as Record<string, string>,
      status: response.status,
      data: response.data
    };
  },

  get: async ({ isbn }: { isbn: any }): Promise<ApiResponse<Book>> => {
    const response = await httpClient.get(`/BookStore/v1/Book?ISBN=${isbn}`);

    return {
      headers: response.headers as Record<string, string>,
      status: response.status,
      data: response.data
    };
  },

  removeOne: async ({
    isbn,
    userId,
    token
  }: { isbn: string; userId: string; token: string }): Promise<ApiResponse<{}>> => {
    const response = await httpClient.delete(`/BookStore/v1/Book`, {
      data: { isbn, userId },
      headers: { Authorization: `Bearer ${token}` }
    });

    return {
      headers: response.headers as Record<string, string>,
      status: response.status,
      data: response.data
    };
  },

  removeAll: async ({ userId, token }: { userId: string; token: string }): Promise<ApiResponse<{}>> => {
    const response = await httpClient.delete(`/BookStore/v1/Books?UserId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return {
      headers: response.headers as Record<string, string>,
      status: response.status,
      data: response.data
    };
  }
} as const;

export default BookService;
