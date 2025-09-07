export interface Book {
  isbn: string;
  title: string;
  author: string;
  message?: string;
}

export interface AddBooksParams {
  userId: string;
  token: string;
  isbns: string | string[];
}
