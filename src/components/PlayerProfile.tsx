import { useParams, Link } from "react-router-dom";
import { chessApi } from "@services/chessApi";
import { useLastOnline } from "@hooks/useLastOnline";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FallbackAvatar } from "@components/shared/FallbackAvatar";
import { LoadingState } from "@components/shared/LoadingState";
import { ErrorState } from "@components/shared/ErrorState";

export const PlayerProfilePage = () => {
  const { username } = useParams<{ username: string }>();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["player", username],
    queryFn: () => chessApi.getPlayerProfile(username!),
    enabled: !!username,
  });

  const timeSinceLastOnline = useLastOnline(profile?.last_online || 0);

  if (isLoading) {
    return <LoadingState message="Loading grandmaster profile..." />;
  }

  if (error || !profile) {
    return (
      <ErrorState
        message={
          error instanceof Error
            ? error.message
            : "Could not load the grandmaster's profile. Please try again later."
        }
        showBackButton
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Grandmasters
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center space-x-6">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={`${profile.username}'s avatar`}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-100"
                  loading="lazy"
                />
              ) : (
                <FallbackAvatar size="lg" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                    {profile.username}
                  </h1>
                  {profile.title && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full flex-shrink-0">
                      {profile.title}
                    </span>
                  )}
                </div>
                {profile.name && (
                  <p className="text-lg text-start sm:text-xl text-gray-600 mt-1 truncate">
                    {profile.name}
                  </p>
                )}
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <span>
                    Member since{" "}
                    {profile.joined
                      ? new Date(profile.joined * 1000).toLocaleDateString()
                      : "N/A"}
                  </span>
                  <span>•</span>
                  <span>{profile.followers?.toLocaleString()} followers</span>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-gray-500">Last online</span>
                  <p className="text-gray-900 font-medium">
                    {timeSinceLastOnline}
                  </p>
                </div>
                {profile.status && (
                  <div className="text-sm">
                    <span className="text-gray-500">Status</span>
                    <p className="text-gray-900 font-medium capitalize">
                      {profile.status}
                    </p>
                  </div>
                )}
              </div>
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
              >
                View on Chess.com
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
