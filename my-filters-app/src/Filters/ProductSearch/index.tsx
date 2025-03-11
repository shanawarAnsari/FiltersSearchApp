import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { SearchOutlined } from "@ant-design/icons";
import { CloseCircleOutlined } from "@ant-design/icons";
import SearchResultsPopper from "./components/SearchResultsPopper";
import { SearchFilterTableProps } from "./types";
import useSearch from "../hooks/useSearch";

const ProductSearch: React.FC<SearchFilterTableProps> = ({
  config,
  data,
  onSelectionChange,
  onSelect,
  elasticityLevel, // Add elasticityLevel prop
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { filteredData, search, debouncedSearch, isLoading } = useSearch(data);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchInput(newValue);
    debouncedSearch(newValue, event.currentTarget);
  };

  const handleTextFieldClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleTextFieldFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClearSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSearchInput("");
    debouncedSearch("", null);
    setAnchorEl(null);
  };

  const handleClosePopper = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ zIndex: 9999 }}>
      <TextField
        placeholder="Find Products and more"
        label="Search"
        variant="outlined"
        value={searchInput}
        onChange={handleSearch}
        onClick={handleTextFieldClick}
        onFocus={handleTextFieldFocus}
        fullWidth
        InputProps={{
          style: { fontSize: "0.85rem", paddingTop: 5, paddingBottom: 5 },
          startAdornment: (
            <InputAdornment position="start" sx={{ marginLeft: "-12px" }}>
              <IconButton>
                <SearchOutlined />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: searchInput && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClearSearch}
                sx={{ marginRight: "-12px" }}
              >
                <CloseCircleOutlined />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <SearchResultsPopper
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClosePopper}
        config={config}
        filteredData={filteredData}
        searchTerm={search}
        searchInput={searchInput}
        onSelect={onSelect}
        onSelectionChange={onSelectionChange}
        isLoading={isLoading}
        elasticityLevel={elasticityLevel} // Pass elasticityLevel to SearchResultsPopper
      />
    </div>
  );
};

export default ProductSearch;
