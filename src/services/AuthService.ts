import { User } from "../types/index"
import { api } from "./httpClient";


// TODO: import 'User' type from the correct path
// TODO: retrieve the correct response message from the API to user
export class AuthService {
  public static async register({ name, email, password, confirmPassword }:
    { name: string; email: string; password: string; confirmPassword: string; }): Promise<any> {
    try {
      const response = await api.post(`/api/users/register`, {
        name,
        email,
        password,
        confirmPassword,
        role: 'user'
      });
      
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  public static async login(emailUser: string, password: string) {
    try {
      const response = await api.post(`/api/auth/login`, {
        emailUser,
        password
      }, {
        withCredentials: true
      })

      return {
        token: response?.data?.token,
        user: response?.data?.user as User
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  public static async logout(): Promise<void> {
    try {
      await api.post(`/api/auth/logout`, {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }
}