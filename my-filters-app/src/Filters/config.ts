export const config: { [key: string]: { type: "single" | "multi"; label: string } } =
  {
    mfr: { type: "single", label: "Manufacturer" },
    cust: { type: "single", label: "Customer" },
    cat: { type: "single", label: "Category" },
    brd: { type: "multi", label: "Brand" },
    subBrd: { type: "multi", label: "Sub Brand" },
    pid: { type: "multi", label: "Pid" },
  };

export const productSearchConfig = {
  columns: [
    { key: "mfr", label: "Manufacturer" },
    { key: "cust", label: "Customer" },
    { key: "cat", label: "Category" },
    { key: "brd", label: "Brand" },
    { key: "subBrd", label: "SubBrand" },
    { key: "pid", label: "Pid" },
  ],
  groups: [
    { name: "Group 1", keys: ["mfr", "cust", "cat"], type: "single" as "single" },
    { name: "Group 2", keys: ["brd", "subBrd", "pid"], type: "multi" as "multi" },
  ],
};

export const order = ["mfr", "cust", "cat", "brd", "subBrd", "pid"];

export const getProductSearchConfig = (elasticityLevel: string) => {
  let columns = [
    { key: "mfr", label: "Manufacturer" },
    { key: "cust", label: "Customer" },
    { key: "cat", label: "Category" },
    { key: "brd", label: "Brand" },
    { key: "subBrd", label: "SubBrand" },
    { key: "pid", label: "Pid" },
  ];

  if (elasticityLevel === "Brand") {
    columns = columns.filter(
      (column) => column.key !== "subBrd" && column.key !== "pid"
    );
  } else if (elasticityLevel === "Sub Brand") {
    columns = columns.filter((column) => column.key !== "pid");
  }

  return {
    columns,
    groups: [
      { name: "Group 1", keys: ["mfr", "cust", "cat"], type: "single" as "single" },
      {
        name: "Group 2",
        keys: columns
          .filter(
            (column) =>
              column.key === "brd" || column.key === "subBrd" || column.key === "pid"
          )
          .map((column) => column.key),
        type: "multi" as "multi",
      },
    ],
  };
};
