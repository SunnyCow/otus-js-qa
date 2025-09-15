import httpClient from './HttpClient';
import type { ApiResponse, AuthCredentials, AuthToken } from '../../types';

const AuthService = {
  generateToken: async ({ username, password }: AuthCredentials): Promise<ApiResponse<AuthToken>> => {
    const response = await httpClient.post('/Account/v1/GenerateToken', {
      userName: username,
      password
    });

    return {
      headers: response.headers as Record<string, string>,
      status: response.status,
      data: response.data
    };
  },

  isAuthorized: async ({ username, password }: AuthCredentials): Promise<ApiResponse<boolean>> => {
    const response = await httpClient.post('/Account/v1/Authorized', {
      userName: username,
      password
    });

    return {
      headers: response.headers as Record<string, string>,
      status: response.status,
      data: response.data
    };
  }
} as const;

export default AuthService;
