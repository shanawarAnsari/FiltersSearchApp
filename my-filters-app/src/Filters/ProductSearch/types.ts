export interface Column {
    key: string;
    label: string;
}

export interface Group {
    name: string;
    keys: string[];
    type: "single" | "multi";
}

export interface Config {
    columns: Column[];
    groups: Group[];
}

export interface DataItem {
    [key: string]: string;
}

export interface SearchFilterTableProps {
    config: Config;
    data: DataItem[];
    onSelectionChange?: (selectedItems: DataItem[]) => void;
    onSelect?: (selectedItems: DataItem[]) => void;
}

export interface SearchResultsPopperProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    config: Config;
    filteredData: DataItem[];
    searchTerm: string;
    searchInput: string;
    onSelect?: (selectedItems: DataItem[]) => void;
    onSelectionChange?: (selectedItems: DataItem[]) => void;
    isLoading: boolean;
}

export interface DataTableProps {
    tableIndex: number;
    data: DataItem[];
    config: Config;
    searchTerm: string;
    selectedSingle: number | null;
    selectedMulti: Record<string, boolean>;
    onRowSelect: (rowIndex: number, isFirstTable: boolean) => void;
    isHeaderCheckboxIndeterminate?: boolean;
    isHeaderCheckboxChecked?: boolean;
    onHeaderCheckboxChange?: () => void;
}

export interface SelectedItemsDisplayProps {
    selectedItems: DataItem[];
    selectedRowValues: Record<string, string>;
    config: Config;
    onClear: () => void;
    onSelect: () => void;
}
