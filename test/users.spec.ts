import UserService from '../framework/services/UserService';
import AuthService from '../framework/services/AuthService';
import generateUserCredentials from '../framework/fixtures/userFixture';
import createAndAuthUser from '../framework/utils/createAndAuthUser';

describe('Bookstore API - User creation tests', () => {
  test('should create user with valid credentials', async () => {
    const user = generateUserCredentials();
    const response = await UserService.create(user);

    expect(response.status).toBe(201);
    expect(response.data).toMatchObject({
      userID: expect.any(String),
      username: user.username
    });
  });

  test('should get info about user', async () => {
    const { user, userResponse, tokenResponse } = await createAndAuthUser();
    const response = await UserService.get({ userId: userResponse.data.userID, token: tokenResponse.data.token });

    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      username: user.username,
      books: expect.any(Array),
      userId: userResponse.data.userID
    });
  });

  test('should falit to get info about user without token', async () => {
    const { userResponse } = await createAndAuthUser();
    const response = await UserService.get({ userId: userResponse.data.userID });

    expect(response.status).toBe(401);
    expect(response.data.message).toBe('User not authorized!');
  });

  test('should fail to create user if username is already taken', async () => {
    const credentials = generateUserCredentials();

    await UserService.create(credentials);

    const response = await UserService.create(credentials);

    expect(response.status).toBe(406);
    expect(response.data.message).toBe('User exists!');
  });

  test('should fail to create user with weak password', async () => {
    const response = await UserService.create(generateUserCredentials({ valid: false, reason: 'weakPassword' }));

    expect(response.status).toBe(400);
    expect(response.data.message).toMatch(/Passwords must have/);
  });

  test('should delete user with valid uuid and token', async () => {
    const { userResponse, tokenResponse } = await createAndAuthUser();
    const response = await UserService.remove({ userId: userResponse.data.userID, token: tokenResponse.data.token });

    expect(response.status).toBe(204);
    expect(response.data).toBe('');
  });

  test("should fail to delete user if uuid and token don't match", async () => {
    const { userResponse } = await createAndAuthUser();
    const { tokenResponse: otherUserTokenResponse } = await createAndAuthUser();
    const response = await UserService.remove({
      userId: userResponse.data.userID,
      token: otherUserTokenResponse.data.token
    });

    expect(response.status).toBe(401);
    expect(response.data.message).toMatch(/user not authorized!/i);
  });
});

describe('Bookstore API - authorization tests', () => {
  test('should generate token with valid credentials', async () => {
    const { tokenResponse: response } = await createAndAuthUser();

    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      status: 'Success',
      token: expect.any(String)
    });
  });

  test('should authorize user with valid credentials', async () => {
    const { user } = await createAndAuthUser();
    const response = await AuthService.isAuthorized(user);

    expect(response.status).toBe(200);
    expect(response.data).toBe(true);
  });

  test('should fail to authorize nonexistent user', async () => {
    const credentials = generateUserCredentials();
    const response = await AuthService.generateToken(credentials);

    expect(response.status).toBe(200);
    expect(response.data).toMatchObject({
      expires: null,
      status: 'Failed',
      token: null
    });
  });

  test('should fail to authorize user without token', async () => {
    const credentials = generateUserCredentials();
    await UserService.create(credentials);

    const response = await AuthService.isAuthorized(credentials);

    expect(response.status).toBe(200);
    expect(response.data).toBe(false);
  });

  test('should fail to generate token without password', async () => {
    const credentials = generateUserCredentials({ valid: false, reason: 'missingPassword' });
    const response = await AuthService.generateToken(credentials);

    expect(response.status).toBe(400);
    expect(response.data.message).toMatch(/username and password required/i);
  });

  test('should fail to generate token without username', async () => {
    const credentials = generateUserCredentials({ valid: false, reason: 'missingUsername' });
    const response = await AuthService.generateToken(credentials);

    expect(response.status).toBe(400);
    expect(response.data.message).toMatch(/username and password required/i);
  });
});
