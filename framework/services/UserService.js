import httpClient from './HttpClient';

const get = async (userId, token) => {
  const response = await httpClient.get(`/Account/v1/User/${userId}`, {
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

const create = async ({ username, password }) => {
  const response = await httpClient.post(`/Account/v1/User`, {
    userName: username,
    password: password
  });

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  };
};

const remove = async (userId, token) => {
  const response = await httpClient.remove(`/Account/v1/User/${userId}`, {
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

export default { get, create, remove };
