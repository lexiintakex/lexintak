import { AlertTriangle } from "lucide-react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center text-red-600 space-y-2">
      <AlertTriangle className="h-8 w-8" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
