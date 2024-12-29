import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchYieldData } from "@/lib/utils";
import { YieldData } from "@/components/YieldTable";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useToast } from "@/components/ui/use-toast";

const DEFILLAMA_API = "https://yields.llama.fi";
const RETRY_DELAY = 5000; // 5 seconds
const MAX_RETRIES = 3;
const POLLING_INTERVAL = 10000; // 10 seconds

export function useYieldData() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Set up WebSocket connection
  useEffect(() => {
    let retryCount = 0;
    let socket: ReturnType<typeof io> | null = null;

    const connectWebSocket = () => {
      if (retryCount >= MAX_RETRIES) {
        console.log("Max WebSocket retries reached, falling back to polling");
        return;
      }

      try {
        socket = io(DEFILLAMA_API, {
          transports: ["websocket"],
          reconnection: true,
          reconnectionDelay: RETRY_DELAY,
          reconnectionAttempts: MAX_RETRIES,
          timeout: 10000,
        });

        socket.on("connect", () => {
          console.log("Connected to DeFiLlama WebSocket");
          retryCount = 0; // Reset retry count on successful connection
          toast({
            title: "Connected",
            description: "Real-time updates enabled",
          });
        });

        socket.on("pools_update", (data) => {
          queryClient.setQueryData(["yieldData"], data);
        });

        socket.on("connect_error", (error) => {
          console.warn("WebSocket connection error:", error);
          retryCount++;
          
          if (retryCount >= MAX_RETRIES) {
            toast({
              variant: "default",
              title: "Switching to Poll Mode",
              description: "Using regular updates every 10 seconds",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Connection Error",
              description: `Retrying... (${retryCount}/${MAX_RETRIES})`,
            });
          }
        });

        socket.on("disconnect", () => {
          console.log("Disconnected from DeFiLlama WebSocket");
          if (retryCount < MAX_RETRIES) {
            setTimeout(connectWebSocket, RETRY_DELAY);
          }
        });
      } catch (error) {
        console.error("Error initializing WebSocket:", error);
        retryCount++;
        if (retryCount < MAX_RETRIES) {
          setTimeout(connectWebSocket, RETRY_DELAY);
        }
      }
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [queryClient, toast]);

  // Fetch initial data and handle polling fallback
  return useQuery<YieldData[]>({
    queryKey: ["yieldData"],
    queryFn: fetchYieldData,
    refetchInterval: POLLING_INTERVAL,
    staleTime: 5000,
    retry: MAX_RETRIES,
    retryDelay: RETRY_DELAY,
  });
}