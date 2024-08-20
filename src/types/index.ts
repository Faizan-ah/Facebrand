export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  color: string;
  meta: {
    category?: string;
    subcategory?: string;
  };
  rating: number;
  quantity: number;
}

export type User = {
  id: string;
  fullName: string;
  phone: number;
  email: string;
  role: string;
};

export const ROLE = {
  Admin: "ADMIN",
  User: "USER"
} as const;

export type DecodedUser = {
  aud: string;
  emailaddress: string;
  exp: number;
  iss: string;
  name: string;
  nameidentifier: string;
  role: keyof typeof ROLE;
};
