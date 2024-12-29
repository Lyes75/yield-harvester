import { useState, useMemo } from "react";
import { YieldTable, type YieldData } from "@/components/YieldTable";
import { Filters } from "@/components/Filters";
import { useYieldData } from "@/hooks/useYieldData";

const Index = () => {
  const [selectedChain, setSelectedChain] = useState("all");
  const [apyRange, setApyRange] = useState<[number, number]>([0, 100]);
  const [tvlRange, setTvlRange] = useState<[number, number]>([0, 1000000000]);

  const { data: yieldData = [], isLoading } = useYieldData();

  // Memoize chains array to prevent unnecessary recalculations
  const chains = useMemo(() => {
    const uniqueChains = new Set(yieldData.map((item) => item.chain));
    return Array.from(uniqueChains);
  }, [yieldData]);

  // Memoize filtered data to prevent infinite loops
  const filteredData = useMemo(() => {
    return yieldData.filter((item) => {
      const chainMatch = selectedChain === "all" || item.chain === selectedChain;
      const apyMatch = item.apy >= apyRange[0] && item.apy <= apyRange[1];
      const tvlMatch = item.tvl >= tvlRange[0] && item.tvl <= tvlRange[1];
      return chainMatch && apyMatch && tvlMatch;
    });
  }, [yieldData, selectedChain, apyRange, tvlRange]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#2A2F3C] py-8 font-inter">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6] text-transparent bg-clip-text mb-4 animate-fade-in">
            DeFi Yield Dashboard
          </h1>
          <p className="text-[#D6BCFA] text-lg animate-fade-in delay-100">
            Explore and analyze yield farming opportunities across different chains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Filters
              chains={chains}
              selectedChain={selectedChain}
              onChainChange={setSelectedChain}
              apyRange={apyRange}
              onApyRangeChange={setApyRange}
              tvlRange={tvlRange}
              onTvlRangeChange={setTvlRange}
            />
          </div>
          <div className="md:col-span-3">
            <YieldTable data={filteredData} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;