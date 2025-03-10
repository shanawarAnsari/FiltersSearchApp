import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Checkbox,
} from "@mui/material";
import { DataTableProps } from "../types";
import { highlightText } from "../utils";

const DataTable = ({
  tableIndex,
  data,
  config,
  searchTerm,
  selectedSingle,
  selectedMulti,
  onRowSelect,
  isHeaderCheckboxIndeterminate,
  isHeaderCheckboxChecked,
  onHeaderCheckboxChange,
}: DataTableProps) => {
  const renderTableHeader = () => (
    <TableHead>
      <TableRow sx={{ height: "30px", backgroundColor: "#dbdbd9" }} >
        <TableCell
          padding="checkbox"
          sx={{
            width: "32px",
            padding: "1px 2px",
            fontWeight: "bold",
            backgroundColor: "#dbdbd9",
            borderBottom: "2px solid black",
          }}
        >
          {tableIndex === 0 ? (
            ""
          ) : (
            <Checkbox
              size="small"
              disabled={selectedSingle === null}
              indeterminate={isHeaderCheckboxIndeterminate}
              checked={isHeaderCheckboxChecked}
              onChange={onHeaderCheckboxChange}
            />
          )}
        </TableCell>
        {config.columns
          .filter((col) => config.groups[tableIndex].keys.includes(col.key))
          .map((col) => (
            <TableCell
              key={col.key}
              sx={{
                fontSize: "10px",
                padding: "1px 4px",
                color: "#333333",
                fontWeight: 600,
                backgroundColor: "#dbdbd9",
                borderBottom: "2px solid black",
              }}
            >
              {col.label}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );

  return (
    <Box
      sx={{
        width: tableIndex === 0 ? "39%" : "59%",
        boxSizing: "border-box",
        border: "1px solid #e0e0e0",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <TableContainer sx={{ maxHeight: "250px" }}>
        <Table size="small"
          padding="none"
          sx={{
            borderCollapse: "collapse",
            "& .MuiTableCell-root": {
              borderBottom: "1px solid #e0e0e0",
              borderRight: "1px solid #e0e0e0",
              "&:last-child": {
                borderRight: "none",
              },
            },
          }}
        >
          {renderTableHeader()}
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} sx={{ height: "24px" }}>
                <TableCell padding="checkbox" sx={{ padding: "0px 2px" }}>
                  <Checkbox
                    size="small"
                    disabled={tableIndex !== 0 && selectedSingle === null}
                    checked={
                      tableIndex === 0
                        ? selectedSingle === rowIndex
                        : !!selectedMulti[rowIndex]
                    }
                    onChange={() => onRowSelect(rowIndex, tableIndex === 0)}
                  />
                </TableCell>
                {config.groups[tableIndex].keys.map((key) => (
                  <TableCell key={key} sx={{ padding: "0px 4px" }}>
                    <Box sx={{ fontSize: "0.75rem" }}>
                      {highlightText(row[key], searchTerm)}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;