import { AxiosResponse } from "axios";
import api from ".";
import { Product } from "../types";

export const getAllProducts = async () => {
  try {
    const response: AxiosResponse<{ data: Product[] }> = await api.get("/products");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
export const createProduct = async (product: Product) => {
  try {
    const res = await api.post("/products", product);
    return res;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
