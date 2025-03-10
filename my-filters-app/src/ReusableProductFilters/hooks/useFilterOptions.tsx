import { useMemo } from "react";

interface FilterOptions {
  [key: string]: string[];
}

const getUniqueSortedValues = (items: Record<string, any>[], key: string): string[] => {
  return [...new Set(items.map((item) => item[key]))].sort();
};

const filterData = (data: Record<string, any>[], filters: { [key: string]: any }, order: string[], index: number) => {
  return data.filter((item) =>
    order
      .slice(0, index)
      .every((prevKey) =>
        !filters[prevKey]?.length
          ? true
          : Array.isArray(filters[prevKey])
            ? filters[prevKey].includes(item[prevKey])
            : item[prevKey] === filters[prevKey]
      )
  );
};

export const useFilterOptions = (
  data: Record<string, any>[],
  order: string[],
  selectedFilters: { [key: string]: any }
): FilterOptions => {
  return useMemo(() => {
    const options: FilterOptions = {};
    order.forEach((key, index) => {
      const filteredData = filterData(data, selectedFilters, order, index);
      options[key] = getUniqueSortedValues(filteredData, key);
    });
    return options;
  }, [selectedFilters, data, order]);
};
