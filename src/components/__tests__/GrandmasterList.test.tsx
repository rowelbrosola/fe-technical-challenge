import { render, screen, waitFor } from "@testing-library/react";
import { GrandmasterList } from "@components/GrandmasterList";
import { chessApi } from "@services/chessApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

// Mock the chessApi
jest.mock("@services/chessApi", () => ({
  chessApi: {
    getGrandmasters: jest.fn(),
  },
}));

const mockGrandmasters = ["MagnusCarlsen", "HikaruNakamura", "FabianoCaruana"];

describe("GrandmasterList", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    (chessApi.getGrandmasters as jest.Mock).mockResolvedValue(mockGrandmasters);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <GrandmasterList />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  it("renders loading state initially", () => {
    renderComponent();
    expect(screen.getByText("Loading grandmasters...")).toBeInTheDocument();
  });

  it("renders grandmaster list after loading", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Chess Grandmasters")).toBeInTheDocument();
    });

    mockGrandmasters.forEach((username) => {
      expect(screen.getByText(username)).toBeInTheDocument();
    });
  });

  it("renders error state when API call fails", async () => {
    (chessApi.getGrandmasters as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("API Error")).toBeInTheDocument();
    });
  });
});
