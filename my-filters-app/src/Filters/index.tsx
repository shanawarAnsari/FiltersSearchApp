import React, { useEffect, useState } from "react";
import { Box, Divider, Grid } from "@mui/material";
import ScenarioNameInput from "./ScenarioNameInput";
import SingleSelectDropdown from "../ReusableProductFilters/components/SingleSelectDropdown";
import ProductFilters from "../ReusableProductFilters/ProductFilters";
import { useGetElasticityLevels } from "./hooks/useGetElasticityLevels";
import { useGetFilters } from "./hooks/useGetFilters";
import ProductSearch from "./ProductSearch";
import { productSearchConfig, config, order } from "./config";
import { useFilterState } from "../ReusableProductFilters/hooks/useFilterState";

const Filters = () => {
  const { data: elasticityLevels, loading: loadingElasticityLevels } =
    useGetElasticityLevels("UK");
  const [scenarioName, setScenarioName] = useState("");
  const [source, setSource] = useState("Nielsen");
  const [elasticityLevel, setElasticityLevel] = useState("Brand");
  const currentYear = new Date().getFullYear();
  const availablePromoPeriods = [currentYear, currentYear + 1, currentYear + 2].map(
    String
  );
  const [promoPeriod, setPromoPeriod] = useState(currentYear.toString());
  const availableSources = ["Nielsen"];
  const { data: filtersData, loading: loadingFilters } = useGetFilters(
    "UK",
    elasticityLevel,
    source
  );
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: any }>({});
  const [filteredData, setFilteredData] = useState<any>(filtersData);
  const { setFilters } = useFilterState(filtersData, order);

  useEffect(() => {
    setFilteredData({});
    setFilters({});
  }, [elasticityLevel]);

  const handleSelect = (items: any[]) => {
    const newSelectedFilters: { [key: string]: any } = {};
    items.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (!newSelectedFilters[key]) {
          newSelectedFilters[key] = [];
        }
        if (!newSelectedFilters[key].includes(item[key])) {
          newSelectedFilters[key].push(item[key]);
        }
      });
    });
    let selectedFiltersforDropdowns: { [key: string]: any } = {};
    productSearchConfig.groups.forEach((group) => {
      group.keys.forEach((key) => {
        if (newSelectedFilters[key]) {
          if (group.type === "single") {
            selectedFiltersforDropdowns[key] = newSelectedFilters[key][0];
          } else if (group.type === "multi") {
            selectedFiltersforDropdowns[key] = newSelectedFilters[key];
          }
        }
      });
    });
    setSelectedFilters(selectedFiltersforDropdowns);
  };

  const handleApplyFilters = (
    filters: { [key: string]: any },
    filtered: Record<string, any>[]
  ) => {
    setSelectedFilters(filters);
    setFilteredData(filtered);
    console.log(filteredData);
  };
  return (
    <Box sx={{ backgroundColor: "#fff", marginTop: 3 }}>
      <Grid container spacing={0.75}>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={12} sm={3} md={3} lg={2.5}>
            <ScenarioNameInput
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={1.5} md={1.5} lg={1}>
            <SingleSelectDropdown
              label="Promo Period"
              selected={promoPeriod}
              options={availablePromoPeriods}
              onChange={(e) => setPromoPeriod(e)}
              isLoading={false}
            />
          </Grid>
          <Grid item xs={12} sm={1.5} md={1.5} lg={1}>
            <SingleSelectDropdown
              label="Source"
              selected={source}
              options={availableSources}
              onChange={(e) => setSource(e)}
              isLoading={false}
            />
          </Grid>
          <Grid item xs={12} sm={1.5} md={1.5} lg={1.2}>
            <SingleSelectDropdown
              label="Elasticity Level"
              selected={elasticityLevel}
              options={elasticityLevels}
              onChange={(e) => setElasticityLevel(e)}
              isLoading={loadingElasticityLevels}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={4.8}>
            <Box sx={{ ml: 6.5 }}>
              <ProductSearch
                config={productSearchConfig}
                data={filtersData}
                onSelect={handleSelect}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <ProductFilters
        preSelectedFilters={selectedFilters}
        data={filtersData || []}
        config={config}
        order={order}
        layout="horizontal"
        onApplyFilters={handleApplyFilters}
        isLoading={loadingFilters}
      />
      <Divider sx={{ border: "1px solid #d4d4d4", my: 1 }} />
    </Box>
  );
};

export default Filters;
