import { useEffect, useState } from "react";
import { mockData } from "../../mockdata";

export const useGetFilters = (subRegion: string, level: string, source: string) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);
    setData(mockData);
    setLoading(false);
    setError("");
  }, [subRegion, level, source]);

  return { data, error, loading };
};
