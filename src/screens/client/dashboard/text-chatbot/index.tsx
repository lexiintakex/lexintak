"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Mic, Send, StopCircle } from "lucide-react";

export function ChatTranscriptTab() {
  const [input, setInput] = useState("");

  const chatMessages = [
    {
      type: "clientbot",
      text: "How many children do you have?",
      sender: "Chatbot",
      avatar: "/assets/dashboard/chatbot-avatar.svg",
    },
    {
      type: "client",
      text: "I have two daughters and one son.",
      sender: "Client",
      avatar: "/assets/dashboard/client-avatar.svg",
    },
    {
      type: "clientbot",
      text: "What is your father name?",
      sender: "Chatbot",
      avatar: "/assets/dashboard/chatbot-avatar.svg",
    },
    {
      type: "client",
      text: "Alex Jones",
      sender: "Client",
      avatar: "/assets/dashboard/client-avatar.svg",
    },
    {
      type: "clientbot",
      text: "What is your mother name?",
      sender: "Chatbot",
      avatar: "/assets/dashboard/chatbot-avatar.svg",
    },
    {
      type: "client",
      text: "Liana Jones",
      sender: "Client",
      avatar: "/assets/dashboard/client-avatar.svg",
    },
  ];

  return (
    <div className="max-w-5xl w-full mx-auto p-6  rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>

      <div className="space-y-6 bg-white rounded-lg p-4 max-h-[400px] overflow-y-auto">
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
                className={`max-w-xs rounded-md px-4 py-3 text-sm ${
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
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center border border-blue-primary rounded-md px-3 py-2 bg-white">
          <input
            type="text"
            placeholder="Can you please repeat?"
            className="flex-1 border-none outline-none text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-primary cursor-pointer"
          >
            <Mic className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-primary cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-x-[10px] pt-1">
          <Button className="bg-red-500 cursor-pointer text-white hover:bg-red-600 rounded-md px-4 py-2 text-sm flex items-center gap-2">
            <StopCircle className="h-4 w-4" />
            Stop Chat
          </Button>
          <Button className="bg-[#E5ECFB] cursor-pointer text-blue-primary hover:bg-blue-100 rounded-md px-4 py-2 text-sm flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
}
