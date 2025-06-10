import { useState, useEffect } from "react";
import { formatTimeSince } from "../utils/time";

export const useLastOnline = (timestamp: number) => {
  const [timeSince, setTimeSince] = useState(formatTimeSince(timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSince(formatTimeSince(timestamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return timeSince;
};
