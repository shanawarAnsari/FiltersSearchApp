import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { dotPulse } from "ldrs";
import React from "react";

interface SingleSelectDropdownProps {
  label: string;
  options: any[];
  selected: any;
  onChange: (value: any) => void;
  isLoading: Boolean;
}

const SingleSelectDropdown = ({
  label,
  options,
  selected,
  onChange,
  isLoading,
}: SingleSelectDropdownProps) => {
  dotPulse.register();
  return (
    <TextField
      select
      label={label}
      value={selected || ""}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      size="small"
      InputProps={{
        startAdornment: isLoading ? (
          <InputAdornment position="start">loading...</InputAdornment>
        ) : null,
        style: { fontSize: "0.75rem", paddingTop: 3.5, paddingBottom: 3.5 },
      }}
      InputLabelProps={{
        shrink: !!selected,
        style: {
          paddingTop: 3.5,
          fontSize: isLoading ? "0rem" : "0.75rem",
        },
      }}
    >
      {options?.map((option, index) => (
        <MenuItem key={index} value={option} sx={{ fontSize: "0.75rem" }}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SingleSelectDropdown;
