import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (!num) return '0';
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toFixed(0);
}

export function formatPercent(num: number): string {
  if (!num) return '0%';
  return num.toFixed(2) + "%";
}

export async function fetchYieldData() {
  try {
    const response = await fetch("https://yields.llama.fi/pools");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data.data.map((item: any) => ({
      protocol: item.project,
      chain: item.chain,
      apy: item.apy,
      apyBase: item.apyBase || 0,
      apyReward: item.apyReward || 0,
      tvl: item.tvlUsd,
      pool: item.symbol,
      rewardTokens: item.rewardTokens || [],
      il7d: item.il7d || 0,
      volumeUsd1d: item.volumeUsd1d || 0,
      stablecoin: item.stablecoin || false,
      predictedClass: item.predictedClass || '',
      poolMeta: item.poolMeta || '',
      exposure: item.exposure || '',
      status: item.status || 'Active'
    }));
  } catch (error) {
    console.error("Error fetching yield data:", error);
    return [];
  }
}