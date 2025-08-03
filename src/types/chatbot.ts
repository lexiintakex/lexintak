export type MessageRole = "user" | "assistant";

export interface APIServerMessage {
  role: MessageRole;
  content: string;
}

export interface ChatMessage {
  type: "client" | "clientbot";
  text: string;
  sender: "Client" | "Chatbot";
  avatar: string;
}

export interface ChatResponse {
  session_id: string;
  response: string;
  history: APIServerMessage[];
}

export interface HistoryResponse {
  session_id: string;
  user_id: string;
  messages: APIServerMessage[];
}
