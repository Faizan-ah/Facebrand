import { Role } from "../lib/accessControl";

export type DecodedUser = {
  aud: string;
  emailaddress: string;
  exp: number;
  iss: string;
  name: string;
  nameidentifier: string;
  role: Role;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  address?: string;
  email: string;
  phoneNumber: string;
  birthDate: string | Date;
  role: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = Omit<User, "id" | "role"> & { password: string };
