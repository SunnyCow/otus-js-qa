import httpClient from './HttpClient';
import type { ApiResponse, User, AuthCredentials, ApiError } from '../../types';

const UserService = {
  get: async ({
    userId,
    token
  }: { userId: string; token: string }): Promise<ApiResponse<User>> => {
    const response = await httpClient.get(`/Account/v1/User/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return {
      headers: response.headers as Record<string, string>,
      status: response.status,
      data: response.data
    };
  },

  create: async ({ username, password }: AuthCredentials): Promise<ApiResponse<User>> => {
    const response = await httpClient.post(`/Account/v1/User`, {
      userName: username,
      password
    });

    return {
      headers: response.headers as Record<string, string>,
      status: response.status,
      data: response.data
    };
  },

  remove: async ({
    userId,
    token
  }: { userId: string; token: string }): Promise<ApiResponse<{} | ApiError>> => {
    const response = await httpClient.delete(`/Account/v1/User/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return {
      headers: response.headers as Record<string, string>,
      status: response.status,
      data: response.data
    };
  }
} as const;

export default UserService;
