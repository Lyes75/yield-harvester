import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchYieldData } from "@/lib/utils";
import { YieldData } from "@/components/YieldTable";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useToast } from "@/components/ui/use-toast";

const DEFILLAMA_API = "https://yields.llama.fi";
const RETRY_DELAY = 5000; // 5 seconds
const MAX_RETRIES = 3;

export function useYieldData() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Set up WebSocket connection
  useEffect(() => {
    const socket = io(DEFILLAMA_API, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionDelay: RETRY_DELAY,
      reconnectionAttempts: MAX_RETRIES,
    });

    socket.on("connect", () => {
      console.log("Connected to DeFiLlama WebSocket");
    });

    socket.on("pools_update", (data) => {
      queryClient.setQueryData(["yieldData"], data);
      toast({
        title: "Data Updated",
        description: "Latest yield farming data received",
      });
    });

    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect to real-time updates",
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient, toast]);

  // Fetch initial data and handle polling fallback
  return useQuery<YieldData[]>({
    queryKey: ["yieldData"],
    queryFn: fetchYieldData,
    refetchInterval: 10000, // Fallback to polling every 10 seconds if WebSocket fails
    staleTime: 5000,
    retry: MAX_RETRIES,
    retryDelay: RETRY_DELAY,
  });
}