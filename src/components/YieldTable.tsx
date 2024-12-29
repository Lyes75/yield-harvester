import { useState } from "react";
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

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const requestSort = (key: keyof YieldData) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Card className="w-full overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => requestSort("protocol")}
            >
              Protocol
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => requestSort("chain")}
            >
              Chain
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-50 text-right"
              onClick={() => requestSort("apy")}
            >
              APY
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-50 text-right"
              onClick={() => requestSort("tvl")}
            >
              TVL
            </TableHead>
            <TableHead>Pool</TableHead>
            <TableHead>Reward Tokens</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row, idx) => (
            <TableRow key={`${row.protocol}-${row.pool}-${idx}`}>
              <TableCell className="font-medium">{row.protocol}</TableCell>
              <TableCell>{row.chain}</TableCell>
              <TableCell className="text-right font-mono">
                {formatPercent(row.apy)}
              </TableCell>
              <TableCell className="text-right font-mono">
                ${formatNumber(row.tvl)}
              </TableCell>
              <TableCell>{row.pool}</TableCell>
              <TableCell>
                {row.rewardTokens.map((token, i) => (
                  <span
                    key={token}
                    className="inline-block bg-defi-secondary/10 text-defi-secondary px-2 py-1 rounded-full text-sm mr-1"
                  >
                    {token}
                  </span>
                ))}
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
    <Card className="w-full p-4">
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
      </div>
    </Card>
  );
}