import httpClient from "./HttpClient";

const getUser = async ({ userId }) => {
  const response = await httpClient.get(`/Account/v1/User/${userId}`);

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

const createUser = async ({ username, password }) => {
  const response = await httpClient.post(`/Account/v1/User`, {
    userName: username,
    password: password
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

const deleteUser = async ({ userId }) => {
  const response = await httpClient.delete(`/Account/v1/User/${userId}`);

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

export default {
  get: getUser,
  create: createUser,
  delete: deleteUser
};
