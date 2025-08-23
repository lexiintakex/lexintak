"use client";
import Image from "next/image";
import { RefreshCw, FileText, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function ConfirmationPage() {
  const router = useRouter();

  const handleRestartConversation = () => {
    router.push("/client/dashboard/tts-bot");
  };

  const handleProceedToForm = () => {
    router.push("/client/dashboard/client-intake-form");
  };

  return (
    <div className="flex min-h-[90vh] items-center justify-center p-4  to-gray-100">
      <Card className="w-full max-w-xl rounded-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        <CardHeader className="pb-6 pt-8">
          <div className="flex items-center justify-center space-x-3 text-blue-primary">
            <div className="p-2 rounded-full bg-blue-50 shadow-sm">
              <Lightbulb className="h-6 w-6 drop-shadow-sm" />
            </div>
            <CardTitle className="text-xl font-bold tracking-tight">
              Confirmation
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-10 px-8 pb-10">
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <Image
                src="/assets/dashboard/chat-bot-1.png"
                alt="Voice Bot Avatar"
                width={140}
                height={140}
                className="relative mx-auto rounded-full shadow-lg ring-4 ring-white ring-opacity-50 transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="space-y-2">
              <p className="text-gray-700 text-lg font-medium">
                Great job completing your conversation!
              </p>
              <p className="text-gray-500 text-sm">
                What would you like to do next?
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleRestartConversation}
              className="w-full font-semibold text-base cursor-pointer rounded-xl bg-blue-primary py-4 px-6 text-white hover:bg-blue-800 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] shadow-md"
            >
              <RefreshCw className="mr-3 h-5 w-5 transition-transform duration-200 group-hover:rotate-180" />
              Restart Conversation
            </Button>

            <Button
              onClick={handleProceedToForm}
              className="w-full font-semibold text-base cursor-pointer rounded-xl bg-green-600 py-4 px-6 text-white hover:bg-green-700 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] shadow-md"
            >
              <FileText className="mr-3 h-5 w-5" />
              Fill Out Application Form
            </Button>
          </div>

          <div className="text-center pt-4 border-t border-gray-100">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="font-medium">
                Your responses have been saved and will be used to pre-fill the
                form.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ConfirmationPage;
