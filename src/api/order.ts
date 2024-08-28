import { AxiosResponse } from "axios";
import api from ".";
import { GlobalResponse } from "@/types";
import { Order } from "@/types/order";

export const getAllOrders = async () => {
  try {
    const response: AxiosResponse<GlobalResponse<Order[]>> = await api.get("/orders");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const updateOrder = async (order: Order) => {
  try {
    const res: AxiosResponse<GlobalResponse<Order>> = await api.put("/orders", order);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const res: AxiosResponse<GlobalResponse<Order>> = await api.delete(`/orders/${id}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
