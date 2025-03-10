import { useState, useEffect, useRef, useCallback } from "react";
import { DataItem } from "../ProductSearch/types";

const useSearch = (data: DataItem[]) => {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState<DataItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!search) {
            setFilteredData([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        const results = data.filter((item) =>
            Object.values(item).some((value) =>
                value.toLowerCase().includes(search.toLowerCase())
            )
        );

        setFilteredData(results);
        setIsLoading(false);
    }, [search, data]);

    // Debounced search function
    const debouncedSearch = useCallback(
        (value: string, element: HTMLElement | null) => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }

            setIsLoading(true); // Trigger loading state as soon as user starts typing

            searchTimeoutRef.current = setTimeout(() => {
                setSearch(value);
            }, 200);
        },
        []
    );

    return {
        search,
        filteredData,
        debouncedSearch,
        isLoading,
    };
};

export default useSearch;
