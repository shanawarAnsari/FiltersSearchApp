import { useEffect, RefObject } from "react";

const useClickOutside = (
    ref: RefObject<HTMLElement | null>,
    handler: () => void
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                const searchField = document.querySelector('input[type="text"]');
                if (
                    searchField &&
                    (searchField === event.target ||
                        searchField.contains(event.target as Node))
                ) {
                    return;
                }

                handler();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, handler]);
};

export default useClickOutside;
