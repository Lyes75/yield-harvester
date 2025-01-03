import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  chains: string[];
  selectedChain: string;
  onChainChange: (chain: string) => void;
  apyRange: [number, number];
  onApyRangeChange: (range: [number, number]) => void;
  tvlRange: [number, number];
  onTvlRangeChange: (range: [number, number]) => void;
}

export function Filters({
  chains,
  selectedChain,
  onChainChange,
  apyRange,
  onApyRangeChange,
  tvlRange,
  onTvlRangeChange,
}: FiltersProps) {
  return (
    <Card className="p-6 space-y-6 bg-[#2A2F3C]/50 border-[#9b87f5]/20 backdrop-blur-sm">
      <div className="space-y-2">
        <Label className="text-[#D6BCFA]">Blockchain</Label>
        <Select value={selectedChain} onValueChange={onChainChange}>
          <SelectTrigger className="bg-[#1A1F2C] border-[#9b87f5]/20 text-[#D6BCFA]">
            <SelectValue placeholder="Select chain" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1F2C] border-[#9b87f5]/20">
            <SelectItem value="all" className="text-[#D6BCFA]">All Chains</SelectItem>
            {chains.map((chain) => (
              <SelectItem key={chain} value={chain} className="text-[#D6BCFA]">
                {chain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-[#D6BCFA]">APY Range (%)</Label>
        <div className="pt-2">
          <Slider
            defaultValue={[apyRange[0], apyRange[1]]}
            max={100}
            step={1}
            onValueChange={(value) => onApyRangeChange(value as [number, number])}
            className="[&>span]:bg-[#9b87f5]"
          />
        </div>
        <div className="flex justify-between text-sm text-[#D6BCFA]/70">
          <span>{apyRange[0]}%</span>
          <span>{apyRange[1]}%</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-[#D6BCFA]">TVL Range ($)</Label>
        <div className="pt-2">
          <Slider
            defaultValue={[tvlRange[0], tvlRange[1]]}
            max={1000000000}
            step={1000000}
            onValueChange={(value) => onTvlRangeChange(value as [number, number])}
            className="[&>span]:bg-[#9b87f5]"
          />
        </div>
        <div className="flex justify-between text-sm text-[#D6BCFA]/70">
          <span>${(tvlRange[0] / 1000000).toFixed(1)}M</span>
          <span>${(tvlRange[1] / 1000000).toFixed(1)}M</span>
        </div>
      </div>
    </Card>
  );
}