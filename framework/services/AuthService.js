import httpClient from "./HttpClient"

const generateToken = async ({ username, password }) => {
  const response = await httpClient.post('/Account/v1/GenerateToken', {
    userName: username,
    password: password
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

export default {
  generateToken
}
