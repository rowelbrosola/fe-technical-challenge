import { useState, useEffect } from "react";
import { formatTimeSince } from "@utils/time";

export const useLastOnline = (timestamp: number, initialTime: string) => {
  const [timeSince, setTimeSince] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSince(formatTimeSince(timestamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return timeSince;
};
