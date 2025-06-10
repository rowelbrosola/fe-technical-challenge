import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export const LoadingState = ({
  message = "Loading...",
  size = "md",
}: LoadingStateProps) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <Loader2 className={`${sizes[size]} text-blue-500 animate-spin`} />
      <p className="text-gray-600">{message}</p>
    </div>
  );
};
