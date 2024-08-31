import { Product } from "./product";

export type Order = {
  id: string;
  userId: string;
  dateTime: number[];
  comments: string;
  status: string;
  address: string;
  products: Product[];
};

export type OrderCreate = Omit<Order, "id" | "dateTime">;
