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
  fullName: string;
  phone: number;
  email: string;
  role: string;
};
