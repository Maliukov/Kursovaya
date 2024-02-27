import {IResponseUserData, IUser, IUserData} from "../types/types";
import {axiosInstance} from "../api/axios.api";

export const AuthService = {
  async registration(userData: IUserData): Promise<IResponseUserData | undefined> {
    const {data} = await axiosInstance.post<IResponseUserData>('user', userData);

    return data;
  },

  async login(userData: IUserData): Promise<IUser | undefined> {
    const {data} = await axiosInstance.post<IUser>('auth/login', userData);

    return data;

  },

  async getUserProfile(): Promise<IUser | undefined> {
    const {data} = await axiosInstance.get<IUser>('auth/profile');
    
    if (data) return data;
  }
}
