import config from "../framework/config/config";
import UserService from "../framework/services/UserService";
import AuthService from "../framework/services/AuthService";
import { generateUserCredentials } from "../framework/fixtures/userFixture";

describe('Bookstore API - User creation tests', () => {
  test('should fail to create user if username is already taken', async () => {
    const credentials = {
      username: config.username,
      password: config.password
    };

    await UserService.create(credentials);

    const response = await UserService.create(credentials);

    expect(response.status).toBe(406);
    expect(response.data.message).toBe('User exists!');
  });

  test('should fail to create user with weak password', async () => {
    const response = await UserService.create({
        username: 'weakPasswordUser',
        password: '0123'
      });

    expect(response.status).toBe(400);
    expect(response.data.message).toMatch(/Passwords must have/);
  });

  test('should create user', async () => {
    const user = generateUserCredentials();

    const response = await UserService.create(user);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('userID');
    expect(response.data.username).toBe(user.username);
  });

});

describe('Bookstore API - token tests', () => {
  test('should fail to generate token with invalid credentials', async () => {
    const username = `user${Date.now()}`;
    const password = '123';

    const response = await AuthService.generateToken({
      username,
      password
    });

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('Failed');
    expect(response.data.result).toMatch(/User authorization failed/);
  });

  test('should generate token with valid credentials', async () => {
    const credentials = generateUserCredentials();

    await UserService.create(credentials);

    const response = await AuthService.generateToken(credentials);

    expect(response.status).toBe(200);
    expect(response.data.status).toBe('Success');
    expect(response.data.token).toBeDefined();
  });
});
