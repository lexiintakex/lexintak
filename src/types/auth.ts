export type Document = {
  label: string;
  type: string;
};
export type User = {
  user_id: string;
  full_name: string;
  username: string;
  email: string;
  phone: string;
  role: "lawyer" | "client";
  form_type: string;
  profile_image: string;
  otp: string | null;
  otp_expires: string | null; // or Date | null if you're parsing dates
  created_by: string | null;
  required_documents: Document[];
  is_application_created?: boolean;
  is_voice_bot_session_created?: boolean;
  created_at: string; // or Date if you parse it
};

export interface SignupData {
  name: string;
  email: string;
  password: string;
  [key: string]: unknown;
}

export type Language = "English" | "Spanish";
export interface AuthContextType {
  user: User | null;
  token: string;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<any>;
  signup: (data: SignupData) => Promise<any>;
  logout: () => void;
  getUserById: () => Promise<void>;
  globalLanguage: Language;
  setGlobalLanguage: (lang: Language) => void;
}
