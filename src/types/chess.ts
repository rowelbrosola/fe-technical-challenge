export type Grandmaster = string;

export interface PlayerProfile {
  username: string;
  title: string;
  name?: string;
  url?: string;
  followers?: number;
  country?: string;
  last_online?: number;
  joined?: number;
  status?: string;
  is_streamer?: boolean;
  verified?: boolean;
  league?: string;
  avatar?: string;
  location?: string;
  twitch_url?: string;
  youtube_url?: string;
  twitter_url?: string;
}
