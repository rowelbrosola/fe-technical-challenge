import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ErrorStateProps {
  message: string;
  showBackButton?: boolean;
}

export const ErrorState = ({
  message,
  showBackButton = false,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <AlertCircle className="w-12 h-12 text-red-500" />
      <p className="text-red-500 text-center max-w-md">{message}</p>
      {showBackButton && (
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Grandmasters
        </Link>
      )}
    </div>
  );
};
