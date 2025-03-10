import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { SnippetsTwoTone, CloseCircleOutlined } from "@ant-design/icons";

interface ScenarioNameInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ScenarioNameInput: React.FC<ScenarioNameInputProps> = ({
  value,
  onChange,
}) => {
  const handleClear = () => {
    onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <TextField
      label="Scenario Name"
      placeholder="Enter Scenario Name"
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ marginLeft: "-16px" }}>
            <IconButton>
              <SnippetsTwoTone
                style={{
                  backgroundColor: "#f0f0f0",
                  fontSize: "1.25em",
                  padding: "4px",
                }}
              />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end" sx={{ marginRight: "-16px" }}>
            <IconButton onClick={handleClear}>
              <CloseCircleOutlined style={{ fontSize: "0.65em" }} />
            </IconButton>
          </InputAdornment>
        ),
        style: { fontSize: "0.75rem", paddingTop: 4, paddingBottom: 4.5 },
      }}
      fullWidth
      size="small"
    />
  );
};

export default ScenarioNameInput;
