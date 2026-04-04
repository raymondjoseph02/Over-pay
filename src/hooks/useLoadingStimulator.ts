import { useEffect, useState } from "react";

export const useLoadingStimulator = (delay = 900) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return { loading };
};
