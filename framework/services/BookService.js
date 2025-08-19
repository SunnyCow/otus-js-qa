import httpClient from './HttpClient';

const replace = async ({ userId, isbns, token }) => {
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

const add = async ({ isbn, replaceIsbn, userId, token }) => {
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

export default { replace, add };
