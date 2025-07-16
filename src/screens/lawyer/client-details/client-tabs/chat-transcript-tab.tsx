"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ChatTranscriptTab() {
  const chatMessages = [
    {
      type: "clientbot",
      text: "How many children do you have?",
      sender: "Chatbot",
      date: "06/12/2024",
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
    <div className="space-y-6">
      <h3 className="text-base font-semibold text-gray-900">Chat History</h3>
      <p className="text-sm text-muted-foreground text-center border-t pt-2">
        06/12/2024
      </p>

      <div className="space-y-4">
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
                className={`max-w-xs rounded-md px-[20px] py-[10px] text-sm ${
                  msg.type === "client" ? "bg-[#F4F9FF]" : "bg-[#F2F6FA] "
                }`}
              >
                <p className="font-medium text-[14px] mb-[2px] text-[#CECECE] ">
                  {msg.sender}
                </p>
                <p className="text-[#686868] text-base font-medium">
                  {msg.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
