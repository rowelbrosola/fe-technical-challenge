import { render, screen, waitFor } from "@testing-library/react";
import { PlayerProfilePage } from "@components/PlayerProfile";
import { chessApi } from "@services/chessApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, MemoryRouter } from "react-router-dom";

// Mock the chessApi
jest.mock("@services/chessApi", () => ({
  chessApi: {
    getPlayerProfile: jest.fn(),
  },
}));

const mockProfile = {
  username: "MagnusCarlsen",
  name: "Magnus Carlsen",
  title: "GM",
  country: "NO",
  followers: 1000000,
  joined: 1234567890,
  last_online: Date.now() / 1000,
  status: "online",
  url: "https://chess.com/member/MagnusCarlsen",
};

describe("PlayerProfile", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    (chessApi.getPlayerProfile as jest.Mock).mockResolvedValue(mockProfile);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter
          initialEntries={[`/player/${mockProfile.username}`]}
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/player/:username" element={<PlayerProfilePage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it("renders loading state initially", () => {
    renderComponent();
    expect(
      screen.getByText("Loading grandmaster profile...")
    ).toBeInTheDocument();
  });

  it("renders player profile after loading", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(mockProfile.username)).toBeInTheDocument();
    });

    expect(screen.getByText(mockProfile.name)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.title)).toBeInTheDocument();
    expect(screen.getByText("View on Chess.com")).toBeInTheDocument();
  });

  it("renders error state when API call fails", async () => {
    (chessApi.getPlayerProfile as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("API Error")).toBeInTheDocument();
    });
  });
});
