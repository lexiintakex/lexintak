export interface User {
  id: string;
  name: string;
  email: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  [key: string]: unknown;
}

export interface AuthContextType {
  user: User | null;
  token: string;
  login: (credentials: { email: string; password: string }) => Promise<any>;
  signup: (data: SignupData) => Promise<any>;
  logout: () => void;
  getUserById: () => Promise<void>;
}
