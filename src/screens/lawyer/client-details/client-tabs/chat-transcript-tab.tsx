"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { API_URL } from "@/screens/client/dashboard/text-chatbot/apiUrl";

type Props = {
  user_id: string;
};

type ChatMessage = {
  type: "client" | "clientbot";
  text: string;
  sender: string;
  avatar: string;
  date?: string;
};

type APIServerMessage = {
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
};

type HistoryResponse = {
  messages: APIServerMessage[];
  session_id: string;
};

export function ChatTranscriptTab({ user_id }: Props) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const transformMessages = (messages: APIServerMessage[]): ChatMessage[] => {
    return messages.map((msg) => ({
      type: msg.role === "user" ? "client" : "clientbot",
      text: msg.content,
      sender: msg.role === "user" ? "Client" : "Chatbot",
      avatar:
        msg.role === "user"
          ? "/assets/dashboard/client-avatar.svg"
          : "/assets/dashboard/chatbot-avatar.svg",
    }));
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `${API_URL}/history?user_id=${user_id}&session_id=${user_id}`
        );
        const data: HistoryResponse[] = await res.json();

        if (data?.[0]?.messages?.length > 0) {
          const transformed = transformMessages(data[0].messages);
          setChatMessages(transformed);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    if (user_id) {
      fetchHistory();
    }
  }, [user_id]);

  return (
    <div className="space-y-6 border border-gray-200 p-4 rounded-lg">
      <h3 className="text-base font-semibold text-gray-900">Chat History</h3>

      {chatMessages.length > 0 && (
        <p className="text-sm text-muted-foreground text-center border-t pt-2">
          {new Date().toLocaleDateString("en-GB")}
        </p>
      )}

      <div className="space-y-4 min-h-[50vh] max-h-[70vh] px-[20px] border border-white shadow-xl overflow-y-auto">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "client" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start gap-3 ${
                msg.type === "client" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <Avatar className="h-[40px] w-[40px]">
                {msg.avatar ? (
                  <AvatarImage src={msg.avatar} alt={msg.sender} />
                ) : (
                  <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                )}
              </Avatar>

              <div
                className={`max-w-xl  rounded-md px-[20px] py-[10px] text-sm ${
                  msg.type === "client" ? "bg-[#F4F9FF]" : "bg-[#F2F6FA]"
                }`}
              >
                <p className="font-medium text-[14px] mb-[2px] text-[#CECECE]">
                  {msg.sender}
                </p>
                <p className="text-[#686868] text-base font-medium">
                  {msg.text}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
