import { AxiosResponse } from "axios";
import { authApi } from ".";
import { GlobalResponse } from "@/types";
import { Order, OrderCreate } from "@/types/order";

export const getAllOrders = async () => {
  try {
    const response: AxiosResponse<GlobalResponse<Order[]>> = await authApi.get("/orders");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const createOrder = async (order: OrderCreate) => {
  try {
    const res: AxiosResponse<GlobalResponse<Order>> = await authApi.post("/orders", order);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const updateOrder = async (order: Order) => {
  try {
    const res: AxiosResponse<GlobalResponse<Order>> = await authApi.put("/orders", order);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const res: AxiosResponse<GlobalResponse<Order>> = await authApi.delete(`/orders/${id}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
