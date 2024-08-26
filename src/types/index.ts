export type GlobalResponse<T> = {
  data: T | null;
  error: ErrorResponse | null;
  timestamp: Date;
};

export type ErrorResponse = {
  message: string;
  statusCode: number;
  timestamp: Date;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  address: null;
  email: string;
  phoneNumber: string;
  birthDate: string;
  role: string;
};
