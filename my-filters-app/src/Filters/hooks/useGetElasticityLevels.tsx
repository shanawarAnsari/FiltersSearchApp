import { useEffect, useState } from "react";

export const useGetElasticityLevels = (country: string) => {
  const [data, setData] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);
    setData(["Brand", "Sub Brand", "PPG"]);
    setLoading(false);
    setError("");
  }, []);

  return { data, error, loading };
};
