import httpClient from "../axios.config";

describe('Bookstore API - User creation tests', () => {
  test('should fail to create user if username is already taken', async () => {
    const credentials = {
      userName: 'dudoser',
      password: 'Dud0$e4!'
    };

    await httpClient.post(`/User`, credentials);

    const response = await httpClient.post(`/User`, credentials);

    expect(response.status).toBe(406);
    expect(response.data.message).toBe('User exists!');
  });

  test('should fail to create user with weak password', async () => {
    const response = await httpClient
      .post(`/User`, {
        userName: 'weakPasswordUser',
        password: '0123'
      })
      .catch((error) => error.response);

    expect(response.status).toBe(400);
    expect(response.data.message).toMatch(/Passwords must have/);
  });

  test('should create user', async () => {
    const userName = `user${Date.now()}`;

    const response = await httpClient.post(`/User`, {
      userName: userName,
      password: 'Password123!'
    });

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('userID');
    expect(response.data.username).toBe(userName);
  });
});

describe('Bookstore API - token tests', () => {
  test('should fail to generate token with invalid credentials', async () => {
    const userName = `user${Date.now()}`;

    const response = await httpClient
      .post(`/GenerateToken`, {
        userName: userName,
        password: 'randompass'
      })
      .catch((error) => error.response);

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('Failed');
    expect(response.data.result).toMatch(/User authorization failed/);
  });

  test('should generate token with valid credentials', async () => {
    const credentials = {
      userName: `user${Date.now()}`,
      password: 'userStrongPass123!'
    };

    await httpClient.post(`/User`, credentials);

    const response = await httpClient.post(`/GenerateToken`, credentials);

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('Success');
    expect(response.data).toHaveProperty('token');
  });
});
