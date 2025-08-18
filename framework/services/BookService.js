import httpClient from './HttpClient';

const addListOfBooks = async ({ userId, isbns, token }) => {
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

export default {
  addBooks: addListOfBooks
};
