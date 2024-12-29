import { useState } from "react";
import { YieldTable, type YieldData } from "@/components/YieldTable";
import { Filters } from "@/components/Filters";
import { fetchYieldData } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const [selectedChain, setSelectedChain] = useState("all");
  const [apyRange, setApyRange] = useState<[number, number]>([0, 100]);
  const [tvlRange, setTvlRange] = useState<[number, number]>([0, 1000000000]);

  const { data: yieldData = [], isLoading } = useQuery({
    queryKey: ["yieldData"],
    queryFn: fetchYieldData,
    refetchInterval: 43200000, // 12 hours
  });

  // Explicitly type the chains array as string[]
  const chains = Array.from(
    new Set((yieldData as YieldData[]).map((item) => item.chain))
  );

  const filteredData = (yieldData as YieldData[]).filter((item) => {
    const chainMatch = selectedChain === "all" || item.chain === selectedChain;
    const apyMatch = item.apy >= apyRange[0] && item.apy <= apyRange[1];
    const tvlMatch = item.tvl >= tvlRange[0] && item.tvl <= tvlRange[1];
    return chainMatch && apyMatch && tvlMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-inter">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-defi-primary mb-2">
            DeFi Yield Dashboard
          </h1>
          <p className="text-defi-muted">
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