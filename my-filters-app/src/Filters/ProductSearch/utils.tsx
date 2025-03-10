export const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === query.toLowerCase() ? (
                    <span key={index} style={{ backgroundColor: "yellow" }}>
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </>
    );
};

export const extractPidPart = (pid: string) => {
    const parts = pid.split("_");
    return parts.length > 1 ? parts[parts.length - 1] : pid;
};