import generateUserCredentials from '../fixtures/userFixture';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';

async function createAndAuthUser() {
  const user = generateUserCredentials();
  const userResponse = await UserService.create(user);
  const tokenResponse = await AuthService.generateToken(user);

  return { user, userResponse, tokenResponse };
}

export default createAndAuthUser;
