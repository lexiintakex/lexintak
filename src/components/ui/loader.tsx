import { Loader2 } from "lucide-react";

export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
      <p className="text-sm text-gray-600 font-medium">{text}</p>
    </div>
  );
}
