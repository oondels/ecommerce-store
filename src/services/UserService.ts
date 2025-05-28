import { User } from "../types/index"
import { api } from "./httpClient";

export class UserService {
  public static async getUserById(userId: string) {
    try {
      const response = await api.get(`/api/users/${userId}`)
      return response?.data;
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  }
}