import generateUserCredentials from '../fixtures/userFixture';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';
import type { User, AuthCredentials, AuthToken, ApiResponse } from '../../types';

async function createAndAuthUser(): Promise<{
  user: AuthCredentials;
  userResponse: ApiResponse<User>;
  tokenResponse: ApiResponse<AuthToken>;
}> {
  const user = generateUserCredentials();
  const userResponse = await UserService.create(user);
  const tokenResponse = await AuthService.generateToken(user);

  return { user, userResponse, tokenResponse };
}

export default createAndAuthUser;
