import axios from 'axios';

const baseUrl = 'https://bookstore.demoqa.com/Account/v1';

describe('Bookstore API - User creation tests', () => {
  test('should fail to create user if username is already taken', async () => {
    const credentials = {
      userName: 'dudoser',
      password: 'Dud0$e4!'
    };

    await axios.post(`${baseUrl}/User`, credentials).catch(() => {});

    const response = await axios.post(`${baseUrl}/User`, credentials).catch(error => error.response);

    expect(response.status).toBe(406);
    expect(response.data.message).toBe('User exists!');
  });

  test('should fail to create user with weak password', async () => {
    const response = await axios.post(`${baseUrl}/User`, {
      userName: 'weakPasswordUser',
      password: '0123'
    }).catch(error => error.response);

    expect(response.status).toBe(400);
    expect(response.data.message).toMatch(/Passwords must have/);
  });

  test('should create user', async () => {
    const userName = `user${Date.now()}`;

    const response = await axios.post(`${baseUrl}/User`, {
      userName: userName,
      password: 'Password123!'
    });

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('userID');
    expect(response.data.username).toBe(userName);
  });
});
