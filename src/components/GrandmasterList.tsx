import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { chessApi } from "../services/chessApi";
import { Loader2 } from "lucide-react";
import { FallbackAvatar } from "./shared/FallbackAvatar";
import { LoadingState } from "./shared/LoadingState";
import { ErrorState } from "./shared/ErrorState";

const ITEMS_PER_PAGE = 20;

const GrandmasterCard = ({ username }: { username: string }) => (
  <Link
    to={`/player/${username}`}
    className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
  >
    <div className="flex items-center space-x-4">
      <FallbackAvatar size="sm" />
      <div>
        <h2 className="text-xl font-semibold">{username}</h2>
      </div>
    </div>
  </Link>
);

export const GrandmasterList = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["grandmasters"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await chessApi.getGrandmasters();
      const start = pageParam * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      return response.slice(start, end);
    },
    getNextPageParam: (_, allPages) => {
      const totalItems = allPages.reduce((acc, page) => acc + page.length, 0);
      return totalItems < 1000 ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return <LoadingState message="Loading grandmasters..." />;
  }

  if (status === "error") {
    return (
      <ErrorState
        message={
          error instanceof Error
            ? error.message
            : "Could not load the grandmasters list. Please try again later."
        }
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chess Grandmasters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.pages.map((page, i) =>
          page.map((username) => (
            <GrandmasterCard key={username} username={username} />
          ))
        )}
      </div>
      <div ref={loadMoreRef} className="h-10 mt-4">
        {isFetchingNextPage && (
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading more grandmasters...</span>
          </div>
        )}
      </div>
    </div>
  );
};
