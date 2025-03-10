import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Popper,
  Paper,
  Box,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { CloseSquareOutlined, SearchOutlined } from "@ant-design/icons";
import DataTable from "./DataTable";
import SelectedItemsDisplay from "../components/SelectedItemsDisplay";
import { SearchResultsPopperProps } from "../types";
import useClickOutside from "../../hooks/useClickOutside";

const SearchResultsPopper: React.FC<SearchResultsPopperProps> = ({
  anchorEl,
  open,
  onClose,
  config,
  filteredData,
  searchTerm,
  searchInput,
  onSelect,
  onSelectionChange,
  isLoading,
}) => {
  const popperRef = useRef<HTMLDivElement | null>(null);
  const [selectedMulti, setSelectedMulti] = useState<Record<string, boolean>>({});
  const [selectedSingle, setSelectedSingle] = useState<number | null>(null);
  const [selectedRowValues, setSelectedRowValues] = useState<Record<string, string>>({});
  useClickOutside(popperRef, onClose);

  // Get unique combinations for the first table
  const uniqueCombinations = useMemo(() => {
    if (!filteredData.length) return [];

    const group1Keys = config.groups[0].keys;
    const uniqueMap = new Map();

    filteredData.forEach((item) => {
      const combinationKey = group1Keys.map((key) => item[key]).join("|");

      if (!uniqueMap.has(combinationKey)) {
        uniqueMap.set(combinationKey, {
          ...item,
          _originalIndex: filteredData.indexOf(item),
        });
      }
    });

    return Array.from(uniqueMap.values());
  }, [filteredData, config.groups]);

  // Filter data for the second table based on selection in first table
  const filteredTable2Data = useMemo(() => {
    if (!selectedSingle && selectedSingle !== 0) return [];

    const selectedCombo = uniqueCombinations[selectedSingle];
    if (!selectedCombo) return [];

    return filteredData.filter((item) =>
      config.groups[0].keys.every((key) => item[key] === selectedCombo[key])
    );
  }, [selectedSingle, uniqueCombinations, filteredData, config.groups]);

  // Show all filtered data in table two, even without selection
  const allTable2Data = useMemo(() => filteredData, [filteredData]);

  // Get the selected items from table 2
  const selectedItems = useMemo(() => {
    if (selectedSingle === null) return [];

    const items = filteredTable2Data.filter((_, idx) => selectedMulti[idx]);
    return items;
  }, [selectedMulti, filteredTable2Data, selectedSingle]);

  // Notify parent component when selection changes
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedItems);
    }
  }, [selectedItems, onSelectionChange]);

  // Clear selections when search term changes
  useEffect(() => {
    setSelectedMulti({});
    setSelectedSingle(null);
    setSelectedRowValues({});
  }, [searchTerm]);

  const isHeaderCheckboxIndeterminate = () => {
    return (
      filteredTable2Data.some((_, idx) => selectedMulti[idx]) &&
      !filteredTable2Data.every((_, idx) => selectedMulti[idx])
    );
  };

  const isHeaderCheckboxChecked = () => {
    return (
      filteredTable2Data.length > 0 &&
      filteredTable2Data.every((_, idx) => selectedMulti[idx])
    );
  };

  const handleHeaderCheckboxChange = () => {
    if (selectedSingle === null) return;

    const newSelected = { ...selectedMulti };
    const allSelected = filteredTable2Data.every((_, idx) => selectedMulti[idx]);

    filteredTable2Data.forEach((_, idx) => {
      newSelected[idx] = !allSelected;
    });

    setSelectedMulti(newSelected);
  };

  const handleRowSelect = (rowIndex: number, isFirstTable: boolean) => {
    if (isFirstTable) {
      // Single selection for first table
      const newSelectedIndex = rowIndex === selectedSingle ? null : rowIndex;
      setSelectedSingle(newSelectedIndex);

      // Store selected row values
      if (newSelectedIndex !== null) {
        const selectedRow = uniqueCombinations[newSelectedIndex];
        const values: Record<string, string> = {};
        config.groups[0].keys.forEach((key) => {
          values[key] = selectedRow[key];
        });
        setSelectedRowValues(values);
      } else {
        setSelectedRowValues({});
      }

      // Clear second table selections when first table selection changes
      setSelectedMulti({});
    } else {
      // Only allow selection in second table if first table has selection
      if (selectedSingle !== null) {
        setSelectedMulti((prev) => ({
          ...prev,
          [rowIndex]: !prev[rowIndex],
        }));
      }
    }
  };

  const handleClear = () => {
    setSelectedMulti({});
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(selectedItems);
    }
    onClose();
  };

  const getTableData = (tableIndex: number) => {
    if (tableIndex === 0) {
      return uniqueCombinations;
    } else {
      return selectedSingle !== null ? filteredTable2Data : allTable2Data;
    }
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="auto"
      style={{ width: "70%", zIndex: 999, border: '1px solid #c1c1c1', borderRadius: '5px' }}
    >
      <Paper
        ref={popperRef}
        elevation={9}
        sx={{ padding: "6px", position: "relative" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "4px 8px",
            borderBottom: "1px solid #e0e0e0",
            marginBottom: "8px",
          }}
        >
          <Box sx={{ fontWeight: 600, fontSize: "0.9rem", color: "#333" }}>
            Search Results
          </Box>
          <IconButton size="small" onClick={onClose} sx={{ padding: "2px" }}>
            <CloseSquareOutlined style={{ fontSize: '18px' }} />
          </IconButton>
        </Box>

        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px",
              gap: 2,
            }}
          >
            <CircularProgress size={32} />
            <Typography variant="body2" color="text.secondary">
              Searching...
            </Typography>
          </Box>
        ) : searchInput.trim() === "" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px",
              gap: 2,
            }}
          >
            <SearchOutlined style={{ fontSize: 48, color: "gray" }} />
            <Typography variant="body1" sx={{ fontWeight: 500, color: "gray" }}>
              Start typing to search
            </Typography>
          </Box>
        ) : filteredData.length > 0 && searchTerm?.length > 0 ? (
          <>
            <Box sx={{ display: "flex", width: "100%", gap: "1%" }}>
              {config.groups.map((group, index) => (
                <DataTable
                  key={index}
                  tableIndex={index}
                  data={getTableData(index)}
                  config={config}
                  searchTerm={searchTerm}
                  selectedSingle={selectedSingle}
                  selectedMulti={selectedMulti}
                  onRowSelect={handleRowSelect}
                  isHeaderCheckboxIndeterminate={
                    index === 1 ? isHeaderCheckboxIndeterminate() : undefined
                  }
                  isHeaderCheckboxChecked={
                    index === 1 ? isHeaderCheckboxChecked() : undefined
                  }
                  onHeaderCheckboxChange={
                    index === 1 ? handleHeaderCheckboxChange : undefined
                  }
                />
              ))}
            </Box>

            <Box sx={{ mt: 1, pt: 1, borderTop: "1px solid #e0e0e0" }}>
              <SelectedItemsDisplay
                selectedItems={selectedItems}
                selectedRowValues={selectedRowValues}
                config={config}
                onClear={handleClear}
                onSelect={handleSelect}
              />
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 20px",
              color: "#999",
            }}
          >
            <SearchOutlined style={{ fontSize: 48, marginBottom: 2 }} />
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              No results found for "{searchInput}"
            </Typography>
          </Box>
        )}
      </Paper>
    </Popper>
  );
};

export default SearchResultsPopper;