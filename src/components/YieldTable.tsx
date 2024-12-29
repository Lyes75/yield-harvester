import { useState, useMemo } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { YieldTableHeader } from "./TableHeader";
import { YieldTableRow } from "./YieldTableRow";
import { sortYieldData } from "@/lib/sortUtils";

export interface YieldData {
  protocol: string;
  chain: string;
  apy: number;
  tvl: number;
  pool: string;
  rewardTokens: string[];
  apyBase: number;
  apyReward: number;
  il7d: number;
  volumeUsd1d: number;
  stablecoin: boolean;
  predictedClass: string;
  poolMeta: string;
  exposure: string;
  status: string;
}

interface YieldTableProps {
  data: YieldData[];
  isLoading: boolean;
}

export function YieldTable({ data, isLoading }: YieldTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof YieldData;
    direction: "asc" | "desc";
  }>({ key: "tvl", direction: "desc" });

  const sortedData = useMemo(() => {
    return sortYieldData(data, sortConfig.key, sortConfig.direction);
  }, [data, sortConfig.key, sortConfig.direction]);

  const requestSort = (key: keyof YieldData) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Card className="w-full overflow-hidden bg-[#2A2F3C]/50 border-[#9b87f5]/20 backdrop-blur-sm">
      <Table>
        <YieldTableHeader onSort={requestSort} />
        <TableBody>
          {sortedData.map((row, index) => (
            <YieldTableRow key={index} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function LoadingState() {
  return (
    <Card className="w-full p-4 bg-[#2A2F3C]/50 border-[#9b87f5]/20 backdrop-blur-sm">
      <div className="space-y-3">
        <div className="h-4 bg-[#1A1F2C] rounded animate-pulse" />
        <div className="h-4 bg-[#1A1F2C] rounded animate-pulse w-5/6" />
        <div className="h-4 bg-[#1A1F2C] rounded animate-pulse" />
      </div>
    </Card>
  );
}