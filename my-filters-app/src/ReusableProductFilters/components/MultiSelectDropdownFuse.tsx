import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Checkbox,
  Typography,
  InputAdornment,
  Box,
  CircularProgress,
} from "@mui/material";
import Fuse from "fuse.js";

interface MultiSelectDropdownFuseProps {
  label: string;
  options: any[];
  selected: any[];
  onChange: (value: any[]) => void;
  isLoading: Boolean;
  disabled: Boolean;
}

const MAX_STRING_LENGTH = 10;
const ITEMS_PER_LOAD = 25;

const renderInputTags = (value: string[]) => {
  const trimmedString =
    value[0].length > MAX_STRING_LENGTH
      ? `${value[0].substring(0, MAX_STRING_LENGTH)}...`
      : value[0];
  if (value.length > 1) {
    return (
      <Typography sx={{ fontSize: "0.62rem" }}>{`${trimmedString} (+${
        value.length - 1
      })`}</Typography>
    );
  } else {
    return <Typography sx={{ fontSize: "0.62rem" }}>{trimmedString}</Typography>;
  }
};

const MultiSelectDropdownFuse = ({
  label,
  options,
  selected,
  onChange,
  isLoading,
  disabled,
}: MultiSelectDropdownFuseProps) => {
  const [loadedItems, setLoadedItems] = useState(ITEMS_PER_LOAD);
  const fuse = new Fuse(options, {
    keys: [],
    threshold: 0.5,
    ignoreLocation: true,
  });
  const loadMoreItems = () => {
    setLoadedItems((prev) => prev + ITEMS_PER_LOAD);
  };
  const isMaxLimit = selected.length === 25;

  return (
    <Autocomplete
      multiple
      disabled={!!disabled}
      limitTags={1}
      disableCloseOnSelect
      size="small"
      options={options}
      getOptionLabel={(option) => option}
      value={selected}
      getOptionDisabled={() => isMaxLimit}
      filterOptions={(options, state) => {
        const results = state.inputValue
          ? fuse.search(state.inputValue).map((result) => result.item)
          : options;
        return results.slice(0, loadedItems);
      }}
      renderOption={(props, option, { selected }) => (
        <li
          {...props}
          style={{
            fontSize: "0.75rem",
            padding: 0,
          }}
        >
          <Checkbox
            size="small"
            sx={{ marginRight: 0, "& .MuiSvgIcon-root": { fontSize: 18 } }}
            checked={selected}
          />
          {option}
        </li>
      )}
      renderTags={(value) => renderInputTags(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label={label}
          placeholder="Search"
          inputProps={{ ...params.inputProps, style: { fontSize: "0.75rem" } }}
          InputLabelProps={{
            style: { fontSize: "0.75rem", paddingTop: 4 },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                {isLoading ? (
                  <Box sx={{ marginLeft: 1 }}>
                    <InputAdornment position="start">
                      <CircularProgress size={16} />
                    </InputAdornment>
                  </Box>
                ) : null}
                {params.InputProps.startAdornment}
              </>
            ),
          }}
        />
      )}
      ListboxProps={{
        onScroll: (event) => {
          const listboxNode = event.currentTarget;
          if (
            listboxNode.scrollTop + listboxNode.clientHeight >=
            listboxNode.scrollHeight - 1
          ) {
            loadMoreItems();
          }
        },
      }}
      onChange={(event, newValue) => {
        onChange(newValue as string[]);
      }}
    />
  );
};

export default MultiSelectDropdownFuse;
