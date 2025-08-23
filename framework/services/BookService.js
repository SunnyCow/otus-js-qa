import httpClient from './HttpClient';

const add = async ({ userId, isbns, token }) => {
  isbns = Array.isArray(isbns) ? isbns : [isbns];

  const response = await httpClient.post(
    `/BookStore/v1/Books`,
    {
      userId,
      collectionOfIsbns: isbns.map((isbn) => ({ isbn }))
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  };
};

const replace = async ({ isbn, replaceIsbn, userId, token }) => {
  const response = await httpClient.put(
    `/BookStore/v1/Books/${isbn}`,
    {
      userId,
      isbn: replaceIsbn
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  };
};

const get = async ({ isbn }) => {
  const response = await httpClient.get(`/BookStore/v1/Book?ISBN=${isbn}`);

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  };
};

const removeOne = async ({ isbn, userId, token }) => {
  const response = await httpClient.delete(`/BookStore/v1/Book`, {
    data: {
      isbn,
      userId
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  };
};

const removeAll = async ({ userId, token }) => {
  const response = await httpClient.delete(`/BookStore/v1/Books?UserId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  };
};

export default {
  replace,
  add,
  get,
  removeOne,
  removeAll
};
