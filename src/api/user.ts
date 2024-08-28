import { AxiosResponse } from "axios";
import api from ".";
import { GlobalResponse } from "@/types";
import { User } from "@/types/user";

export const getAllUsers = async () => {
  try {
    const response: AxiosResponse<GlobalResponse<User[]>> = await api.get("/users");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const updateUser = async (user: User) => {
  try {
    const res: AxiosResponse<GlobalResponse<User>> = await api.put("/users", user);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res: AxiosResponse<GlobalResponse<User>> = await api.delete(`/users/${id}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
