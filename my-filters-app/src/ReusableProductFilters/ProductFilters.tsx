import React from "react";
import { Grid, Button } from "@mui/material";
import SingleSelectDropdown from "./components/SingleSelectDropdown";
import MultiSelectDropdownFuse from "./components/MultiSelectDropdownFuse";
import { useFilterState } from "./hooks/useFilterState";
import { useFilterOptions } from "./hooks/useFilterOptions";
import { useEffect } from "react";

interface FilterConfig {
  type: "single" | "multi";
  label: string;
}

interface ProductFiltersProps {
  data: Array<Record<string, any>>;
  config: {
    [key: string]: FilterConfig;
  };
  order: string[];
  layout?: "horizontal" | "vertical";
  onApplyFilters?: (
    filters: { [key: string]: any },
    filtered: Record<string, any>[]
  ) => void;
  isLoading: Boolean;
  preSelectedFilters: any;
}

const ProductFilters = ({
  data,
  config,
  order,
  layout,
  onApplyFilters,
  isLoading,
  preSelectedFilters,
}: ProductFiltersProps) => {
  const { selectedFilters, handleFilterChange, clearFilters, setFilters } =
    useFilterState(data, order);
  const availableOptions = useFilterOptions(data, order, selectedFilters);

  useEffect(() => {
    setFilters(preSelectedFilters);
  }, [preSelectedFilters, setFilters]);
  const allSingleSelected = order
    .filter((key) => config[key].type === "single")
    .every((key) => selectedFilters[key]);

  const applyFilters = () => {
    const filteredData = data.filter((item) =>
      order.every((key) =>
        !selectedFilters[key]?.length
          ? true
          : Array.isArray(selectedFilters[key])
          ? selectedFilters[key].includes(item[key])
          : item[key] === selectedFilters[key]
      )
    );
    if (onApplyFilters) {
      onApplyFilters(selectedFilters, filteredData);
    }
  };
  return (
    <Grid
      container
      spacing={0.75}
      direction={layout === "horizontal" ? "row" : "column"}
      alignItems="center"
      sx={{ my: "4px" }}
    >
      {order.map((key) => {
        const filterConfig = config[key];
        const options = availableOptions[key] || [];
        const selected =
          selectedFilters[key] || (filterConfig.type === "single" ? "" : []);

        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={
              layout === "horizontal"
                ? filterConfig.type === "single"
                  ? 1.25
                  : 2.25
                : 1.25
            }
            lg={
              layout === "horizontal"
                ? filterConfig.type === "single"
                  ? 1.25
                  : 2.25
                : 1.25
            }
            key={key}
          >
            {filterConfig.type === "single" ? (
              <SingleSelectDropdown
                label={filterConfig.label}
                options={options}
                selected={selected}
                onChange={(value: string) => handleFilterChange(key, value)}
                isLoading={isLoading}
              />
            ) : (
              <MultiSelectDropdownFuse
                label={filterConfig.label}
                options={options}
                selected={selected}
                onChange={(value: string[]) => handleFilterChange(key, value)}
                isLoading={isLoading}
                disabled={!allSingleSelected}
              />
            )}
          </Grid>
        );
      })}
      <Grid
        item
        md={layout === "horizontal" ? 1.5 : 1.25}
        lg={layout === "horizontal" ? 1.5 : 1.25}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: layout === "horizontal" ? "10px" : "8px",
        }}
      >
        <Button
          sx={{
            maxHeight: "1.5rem",
            maxWidth: "2rem",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
          size="small"
          variant="contained"
          color="primary"
          onClick={applyFilters}
          style={{ marginLeft: "8px" }}
        >
          Apply
        </Button>
        <Button
          sx={{
            maxHeight: "1.5rem",
            maxWidth: "2rem",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
          variant="outlined"
          size="small"
          color="secondary"
          onClick={clearFilters}
          style={{ marginLeft: "8px" }}
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductFilters;
