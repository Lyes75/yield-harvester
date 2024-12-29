import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { formatNumber, formatPercent } from "@/lib/utils";

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
    if (!Array.isArray(data) || data.length === 0) return [];
    
    const safeSort = (a: YieldData, b: YieldData): number => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // If both values are null/undefined, consider them equal
      if (aValue == null && bValue == null) return 0;
      // If only one value is null/undefined, sort it last
      if (aValue == null) return sortConfig.direction === "asc" ? 1 : -1;
      if (bValue == null) return sortConfig.direction === "asc" ? -1 : 1;

      // Handle numeric values
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      // Handle string values
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    };

    return [...data].sort(safeSort);
  }, [data, sortConfig.key, sortConfig.direction]);

  const requestSort = (key: keyof YieldData) => {
    setSortConfig((prev) => {
      const newDirection = prev.key === key && prev.direction === "asc" ? "desc" : "asc";
      return { key, direction: newDirection };
    });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Card className="w-full overflow-hidden bg-[#2A2F3C]/50 border-[#9b87f5]/20 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-b-[#9b87f5]/20">
            <TableHead
              className="cursor-pointer hover:bg-[#1A1F2C]/50 text-[#D6BCFA]"
              onClick={() => requestSort("protocol")}
            >
              Project
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-[#1A1F2C]/50 text-[#D6BCFA]"
              onClick={() => requestSort("chain")}
            >
              Chain
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-[#1A1F2C]/50 text-right text-[#D6BCFA]"
              onClick={() => requestSort("apy")}
            >
              Total APY
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-[#1A1F2C]/50 text-right text-[#D6BCFA]"
              onClick={() => requestSort("apyBase")}
            >
              Base APY
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-[#1A1F2C]/50 text-right text-[#D6BCFA]"
              onClick={() => requestSort("apyReward")}
            >
              Reward APY
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-[#1A1F2C]/50 text-right text-[#D6BCFA]"
              onClick={() => requestSort("tvl")}
            >
              TVL
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-[#1A1F2C]/50 text-right text-[#D6BCFA]"
              onClick={() => requestSort("il7d")}
            >
              IL 7d
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-[#1A1F2C]/50 text-right text-[#D6BCFA]"
              onClick={() => requestSort("volumeUsd1d")}
            >
              Volume 24h
            </TableHead>
            <TableHead className="text-[#D6BCFA]">Pool</TableHead>
            <TableHead className="text-[#D6BCFA]">Pool Meta</TableHead>
            <TableHead className="text-[#D6BCFA]">Exposure</TableHead>
            <TableHead className="text-[#D6BCFA]">Status</TableHead>
            <TableHead className="text-[#D6BCFA]">Reward Tokens</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row, idx) => (
            <TableRow 
              key={`${row.protocol}-${row.chain}-${row.pool}-${idx}`}
              className="border-b-[#9b87f5]/20 hover:bg-[#1A1F2C]/30"
            >
              <TableCell className="font-medium text-[#D6BCFA]">{row.protocol}</TableCell>
              <TableCell className="text-[#D6BCFA]">{row.chain}</TableCell>
              <TableCell className="text-right font-mono text-[#8B5CF6]">
                {formatPercent(row.apy)}
              </TableCell>
              <TableCell className="text-right font-mono text-[#8B5CF6]">
                {formatPercent(row.apyBase)}
              </TableCell>
              <TableCell className="text-right font-mono text-[#8B5CF6]">
                {formatPercent(row.apyReward)}
              </TableCell>
              <TableCell className="text-right font-mono text-[#9b87f5]">
                ${formatNumber(row.tvl)}
              </TableCell>
              <TableCell className="text-right font-mono text-[#9b87f5]">
                {row.il7d ? formatPercent(row.il7d) : 'N/A'}
              </TableCell>
              <TableCell className="text-right font-mono text-[#9b87f5]">
                ${formatNumber(row.volumeUsd1d)}
              </TableCell>
              <TableCell className="text-[#D6BCFA]">{row.pool}</TableCell>
              <TableCell className="text-[#D6BCFA]">{row.poolMeta || 'N/A'}</TableCell>
              <TableCell className="text-[#D6BCFA]">{row.exposure || 'N/A'}</TableCell>
              <TableCell className="text-[#D6BCFA]">{row.status || 'Active'}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {row.rewardTokens.map((token, tokenIdx) => (
                    <span
                      key={`${token}-${tokenIdx}`}
                      className="inline-block bg-[#9b87f5]/10 text-[#D6BCFA] px-2 py-1 rounded-full text-sm"
                    >
                      {token}
                    </span>
                  ))}
                </div>
              </TableCell>
            </TableRow>
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