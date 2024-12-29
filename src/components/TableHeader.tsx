import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { YieldData } from "@/components/YieldTable";

interface TableHeaderProps {
  onSort: (key: keyof YieldData) => void;
}

export function YieldTableHeader({ onSort }: TableHeaderProps) {
  return (
    <TableHeader>
      <TableRow className="border-b-[#9b87f5]/20">
        <TableHead
          className="cursor-pointer hover:bg-[#1A1F2C]/50 text-[#D6BCFA]"
          onClick={() => onSort("protocol")}
        >
          Project
        </TableHead>
        <TableHead
          className="cursor-pointer hover:bg-[#1A1F2C]/50 text-[#D6BCFA]"
          onClick={() => onSort("chain")}
        >
          Chain
        </TableHead>
        <TableHead
          className="cursor-pointer hover:bg-[#1A1F2C]/50 text-right text-[#D6BCFA]"
          onClick={() => onSort("apy")}
        >
          Total APY
        </TableHead>
        <TableHead
          className="cursor-pointer hover:bg-[#1A1F2C]/50 text-right text-[#D6BCFA]"
          onClick={() => onSort("apyBase")}
        >
          Base APY
        </TableHead>
        <TableHead
          className="cursor-pointer hover:bg-[#1A1F2C]/50 text-right text-[#D6BCFA]"
          onClick={() => onSort("apyReward")}
        >
          Reward APY
        </TableHead>
        <TableHead
          className="cursor-pointer hover:bg-[#1A1F2C]/50 text-right text-[#D6BCFA]"
          onClick={() => onSort("tvl")}
        >
          TVL
        </TableHead>
        <TableHead
          className="cursor-pointer hover:bg-[#1A1F2C]/50 text-right text-[#D6BCFA]"
          onClick={() => onSort("il7d")}
        >
          IL 7d
        </TableHead>
        <TableHead
          className="cursor-pointer hover:bg-[#1A1F2C]/50 text-right text-[#D6BCFA]"
          onClick={() => onSort("volumeUsd1d")}
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
  );
}