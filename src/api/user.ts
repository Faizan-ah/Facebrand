import { AxiosResponse, isAxiosError } from "axios";
import { api, authApi } from ".";
import { GlobalResponse } from "@/types";
import { User, UserLogin, UserRegister } from "@/types/user";

export const getAllUsers = async () => {
  try {
    const response: AxiosResponse<GlobalResponse<User[]>> = await authApi.get("/users");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const loginUser = async (user: UserLogin) => {
  try {
    const res: AxiosResponse<GlobalResponse<{ token: string; user: User }>> = await api.post(
      "/users/login",
      user
    );
    return res.data.data;
  } catch (error) {
    //TODO: handle errors consistently
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.error?.message || "An unknown error occurred";
      return Promise.reject(new Error(errorMessage));
    } else {
      return Promise.reject(new Error("An unexpected error occurred"));
    }
  }
};

export const registerUser = async (user: UserRegister) => {
  try {
    const res: AxiosResponse<GlobalResponse<User>> = await api.post("/users/register", user);
    return res.data.data;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.error?.message || "An unknown error occurred";
      return Promise.reject(new Error(errorMessage));
    } else {
      return Promise.reject(new Error("An unexpected error occurred"));
    }
  }
};

export const updateUser = async (user: User) => {
  try {
    const res: AxiosResponse<GlobalResponse<User>> = await authApi.put("/users", user);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res: AxiosResponse<GlobalResponse<User>> = await authApi.delete(`/users/${id}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
