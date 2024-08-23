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
