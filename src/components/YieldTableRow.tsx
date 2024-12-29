import { TableCell, TableRow } from "@/components/ui/table";
import { YieldData } from "@/components/YieldTable";
import { formatNumber, formatPercent } from "@/lib/utils";

interface YieldTableRowProps {
  row: YieldData;
  index: number;
}

export function YieldTableRow({ row, index }: YieldTableRowProps) {
  const uniqueKey = `${row.protocol}-${row.chain}-${row.pool}-${row.tvl}-${index}`;
  
  return (
    <TableRow 
      key={uniqueKey}
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
  );
}