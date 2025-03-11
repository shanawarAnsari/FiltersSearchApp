interface FilterConfig {
  type: "single" | "multi";
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

export const baseConfig: ConfigMap = {
  mfr: { type: "single", label: "Manufacturer" },
  cust: { type: "single", label: "Customer" },
  cat: { type: "single", label: "Category" },
  brd: { type: "multi", label: "Brand" },
  subBrd: { type: "multi", label: "Sub Brand" },
  pid: { type: "multi", label: "Pid" },
};

export const baseOrder = ["mfr", "cust", "cat", "brd", "subBrd", "pid"];
