import { YieldData } from "@/components/YieldTable";

export const sortYieldData = (
  data: YieldData[],
  key: keyof YieldData,
  direction: "asc" | "desc"
): YieldData[] => {
  if (!Array.isArray(data) || data.length === 0) return [];
  
  return [...data].sort((a, b) => {
    if (!a || !b) return 0;
    
    const aValue = a[key];
    const bValue = b[key];

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });
};