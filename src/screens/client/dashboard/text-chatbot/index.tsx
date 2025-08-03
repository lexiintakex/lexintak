"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mic, Send, StopCircle } from "lucide-react";
import {
  APIServerMessage,
  ChatMessage,
  ChatResponse,
  HistoryResponse,
} from "@/types/chatbot";
import useAuth from "@/hooks/useAuth";
import { API_URL } from "./apiUrl";
import Link from "next/link";

export function ChatTranscriptTab() {
  const [input, setInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { user } = useAuth();
  const user_id = user?.user_id || "default_user_id";
  const session_id = user?.user_id || "default_session_id";

  // Scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Format messages
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

  // Fetch chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `${API_URL}/history?session_id=${session_id}&user_id=${user_id}`
        );
        const data: HistoryResponse[] = await res.json();

        if (data?.[0]?.messages?.length > 0) {
          const transformed = transformMessages(data[0].messages);
          setChatMessages(transformed);
        } else {
          // Initial message
          setChatMessages([
            {
              type: "clientbot",
              text: "What is your legal name?",
              sender: "Chatbot",
              avatar: "/assets/dashboard/chatbot-avatar.svg",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, [user_id, session_id]);

  // Send user message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      type: "client",
      text: input,
      sender: "Client",
      avatar: "/assets/dashboard/client-avatar.svg",
    };

    const loadingMessage: ChatMessage = {
      type: "clientbot",
      text: "Typing...",
      sender: "Chatbot",
      avatar: "/assets/dashboard/chatbot-avatar.svg",
    };

    const updatedMessages = [...chatMessages, userMessage, loadingMessage];
    setChatMessages(updatedMessages);
    setInput("");

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id,
          user_id,
          message: input,
        }),
      });

      const data: ChatResponse = await res.json();

      if (data?.history) {
        const transformed = transformMessages(data.history);
        setChatMessages(transformed);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setChatMessages([
        ...updatedMessages.slice(0, -1),
        {
          type: "clientbot",
          text: "Sorry, something went wrong.",
          sender: "Chatbot",
          avatar: "/assets/dashboard/chatbot-avatar.svg",
        },
      ]);
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto p-6 rounded-lg shadow-xl bg-white">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>

      <div className="space-y-6 bg-white border border-gray-200 rounded-lg p-4 max-h-[50vh] min-h-[50vh] overflow-y-auto">
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
                  <AvatarFallback>{msg.sender?.[0] || "?"}</AvatarFallback>
                )}
              </Avatar>
              <div
                className={`max-w-xl rounded-md px-4 py-3 text-sm ${
                  msg.type === "client" ? "bg-[#F4F9FF]" : "bg-[#F2F6FA]"
                }`}
              >
                <p className="font-medium text-[13px] text-[#A0A0A0] mb-1">
                  {msg.sender}
                </p>
                <p className="text-[#3C3C3C] text-[15px] font-medium leading-snug">
                  {msg.text}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center border border-blue-primary rounded-md px-3 py-2 bg-white">
          <input
            type="text"
            placeholder="Type your answer..."
            className="flex-1 border-none outline-none text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-primary cursor-pointer"
            onClick={sendMessage}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-x-[10px] pt-1">
          <Link
            href={"/client/dashboard/select-bot"}
            className="bg-red-500 cursor-pointer text-white hover:bg-red-600 rounded-md px-4 py-2 text-sm flex items-center gap-2"
          >
            <StopCircle className="h-4 w-4" />
            Stop Chat and Exit
          </Link>
        </div>
      </div>
    </div>
  );
}
