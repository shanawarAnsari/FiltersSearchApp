import { useMemo } from "react";

type FilterType = "single" | "multi";

interface FilterConfig {
  type: FilterType;
  label: string;
}

interface ConfigMap {
  mfr?: FilterConfig;
  cust?: FilterConfig;
  cat?: FilterConfig;
  brd?: FilterConfig;
  subBrd?: FilterConfig;
  pid?: FilterConfig;
  [key: string]: FilterConfig | undefined;
}

interface ConfigHookResult {
  config: ConfigMap;
  order: string[];
}

export const useConfig = (elasticityLevel: string): ConfigHookResult => {
  return useMemo(() => {
    const baseConfig: ConfigMap = {
      mfr: { type: "single", label: "Manufacturer" },
      cust: { type: "single", label: "Customer" },
      cat: { type: "single", label: "Category" },
      brd: { type: "multi", label: "Brand" },
      subBrd: { type: "multi", label: "Sub Brand" },
      pid: { type: "multi", label: "Pid" },
    };

    const baseOrder = ["mfr", "cust", "cat", "brd", "subBrd", "pid"];

    let config = { ...baseConfig };
    let order = [...baseOrder];

    switch (elasticityLevel) {
      case "Brand":
        delete config.subBrd;
        delete config.pid;
        order = order.filter((key) => key !== "subBrd" && key !== "pid");
        break;
      case "Sub Brand":
        delete config.pid;
        order = order.filter((key) => key !== "pid");
        break;
    }

    return { config, order };
  }, [elasticityLevel]);
};
