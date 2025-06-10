import type { Grandmaster, PlayerProfile } from "../types/chess";

const BASE_URL = "https://api.chess.com/pub";

export const chessApi = {
  async getGrandmasters(): Promise<Grandmaster[]> {
    const response = await fetch(`${BASE_URL}/titled/GM`);
    if (!response.ok) {
      throw new Error("Failed to fetch grandmasters");
    }
    const data = await response.json();
    console.log("Grandmasters API Response:", data);
    return data.players;
  },

  async getPlayerProfile(username: string): Promise<PlayerProfile> {
    const response = await fetch(`${BASE_URL}/player/${username}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch profile for ${username}`);
    }
    const data = await response.json();
    console.log("Player Profile API Response:", data);

    // Extract country code from URL if it exists
    const countryCode = data.country
      ? data.country.split("/").pop()
      : undefined;

    return {
      ...data,
      country: countryCode,
    };
  },
};
