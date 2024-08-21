import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return data;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveDataToLocalStorage = (key: string, data: any) => {
  return localStorage.setItem(key, JSON.stringify(data));
};
