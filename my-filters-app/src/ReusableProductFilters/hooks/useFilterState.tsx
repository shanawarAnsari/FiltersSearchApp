import { useState, useCallback } from "react";

export const useFilterState = (data: Record<string, any>[], order: string[]) => {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: any }>({});

  const isFilterMatch = (
    item: Record<string, any>,
    filters: { [key: string]: any },
    key: string
  ) => {
    return order.slice(0, order.indexOf(key) + 1).every((prevKey) => {
      if (!filters[prevKey]?.length) {
        return true;
      } else if (Array.isArray(filters[prevKey])) {
        return filters[prevKey].includes(item[prevKey]);
      } else {
        return item[prevKey] === filters[prevKey];
      }
    });
  };

  const getFilteredData = (filters: { [key: string]: any }, key: string) => {
    return data.filter((item) => isFilterMatch(item, filters, key));
  };

  const getSubsequentOptions = (
    filteredData: Record<string, any>[],
    subsequentKey: string
  ) => {
    return [...new Set(filteredData.map((item) => item[subsequentKey]))].sort();
  };

  const handleFilterChange = (key: string, value: any) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev, [key]: value };

      order.slice(order.indexOf(key) + 1).forEach((subsequentKey) => {
        const filteredData = getFilteredData(newFilters, key);
        const subsequentOptions = getSubsequentOptions(filteredData, subsequentKey);

        if (Array.isArray(newFilters[subsequentKey])) {
          newFilters[subsequentKey] = newFilters[subsequentKey].filter((val: any) =>
            subsequentOptions.includes(val)
          );
        } else {
          if (subsequentOptions.includes(newFilters[subsequentKey])) {
            newFilters[subsequentKey] = newFilters[subsequentKey];
          } else {
            newFilters[subsequentKey] = "";
          }
        }
      });

      return newFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  const setFilters = useCallback((filters: { [key: string]: any }) => {
    setSelectedFilters(filters)
  }, [])

  return { selectedFilters, handleFilterChange, clearFilters, setFilters };
};
