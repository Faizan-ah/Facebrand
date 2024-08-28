import { AxiosResponse } from "axios";
import api from ".";
import { CreateProduct, Product } from "../types/product";
import { GlobalResponse } from "@/types";

export const getAllProducts = async () => {
  try {
    const response: AxiosResponse<GlobalResponse<Product[]>> = await api.get("/products");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const createProduct = async (product: CreateProduct) => {
  try {
    const res: AxiosResponse<GlobalResponse<Product>> = await api.post("/products", product);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const updateProduct = async (product: Product) => {
  try {
    const res: AxiosResponse<GlobalResponse<Product>> = await api.put("/products", product);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res: AxiosResponse<GlobalResponse<Product>> = await api.delete(`/products/${id}`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
