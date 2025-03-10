import React from "react";
import { Box, Chip, Button } from "@mui/material";
import { SelectedItemsDisplayProps } from "../types";
import { extractPidPart } from "../utils";

const SelectedItemsDisplay: React.FC<SelectedItemsDisplayProps> = ({
  selectedItems,
  selectedRowValues,
  config,
  onClear,
  onSelect,
}) => {
  return (
    <>
      {Object.keys(selectedRowValues).length > 0 && (
        <Box sx={{ mb: 1 }}>
          <Box
            sx={{
              bgcolor: "#f0f7ff",
              border: "1px solid #bbd6f7",
              borderRadius: "4px",
              padding: "4px 8px",
              fontSize: "0.8rem",
              display: "flex",
              gap: 1,
            }}
          >
            {config.groups[0].keys.map((key) => (
              <Box key={key} sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ fontWeight: 600, mr: 0.5 }}>
                  {config.columns.find((col) => col.key === key)?.label || key}:
                </Box>
                <Box>{selectedRowValues[key]}</Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Box
        sx={{
          fontWeight: "600",
          border: "1px solid #c4c4c4",
          borderRadius: "4px",
          padding: "8px",
          backgroundColor: "#fafafa",
          minHeight: "100px",
          maxHeight: "120px",
          overflowY: "auto",
          position: "relative",
          "&:hover": {
            borderColor: "#666",
          },
          "&:focus-within": {
            borderColor: "#1976d2",
            borderWidth: "2px",
            padding: "7px",
          },
        }}
      >
        {selectedItems.length > 0 ? (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.7 }}>
            {selectedItems.map((item, idx) => {
              // Find the PID in the item
              const pidKey = config.groups[1].keys.find((key) =>
                key.toLowerCase().includes("pid")
              );
              const pid = pidKey ? item[pidKey] : "";
              const pidValue = extractPidPart(pid);

              // Get other keys (brand, subbrand)
              const otherKeys = config.groups[1].keys.filter(
                (key) => !key.toLowerCase().includes("pid")
              );

              // Construct the chip label
              const chipLabel = [
                ...otherKeys.map((key) => item[key]),
                pidValue,
              ].join(" | ");

              return (
                <Chip
                  key={idx}
                  label={chipLabel}
                  size="small"
                  sx={{
                    color: "#404040",
                    bgcolor: "#f0f0f0",
                    border: "1px solid #e0e0e0",
                    fontSize: "0.7rem",
                    height: "22px",
                    margin: "2px",
                    "& .MuiChip-label": {
                      padding: "0 6px",
                    },
                  }}
                />
              );
            })}
          </Box>
        ) : (
          <Box
            sx={{
              color: "#666",
              fontSize: "0.75rem",
              fontStyle: "italic",
              padding: "4px",
            }}
          >
            No products selected. Select items from the tables above.
          </Box>
        )}
      </Box>

      {selectedItems.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            mt: 1,
          }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={onClear}
            sx={{
              fontSize: "0.75rem",
              py: 0.5,
              minHeight: 0,
              minWidth: 0,
            }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={onSelect}
            sx={{
              fontSize: "0.75rem",
              py: 0.5,
              minHeight: 0,
              minWidth: 0,
            }}
          >
            Select
          </Button>
        </Box>
      )}
    </>
  );
};

export default SelectedItemsDisplay;