import { useEffect, useState } from "react";
import { socket } from "./socket";
import { MESSAGES } from "./play-quiz/messages";
import { useQueryClient } from "@tanstack/react-query";
import type { WsAckResponse } from "./types";
import { authClient } from "@/lib/auth-client";

const useSocket = (
  { events = [] }: { events: (keyof typeof MESSAGES)[] } = { events: [] }
) => {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const [isSocketConnected, setIsSocketConnected] = useState(
    socket.client.connected
  );
  useEffect(() => {
    if (!socket.client.connected) {
      const connection = socket.client.connect();
      console.log("Socket connecting...", connection.id);
    } else {
      console.log("Socket already connected", socket.client.id);
    }
    setIsSocketConnected(true);

    const listeners: Array<{
      event: string;
      handler: (...args: any[]) => void;
    }> = [];

    events.forEach((value) => {
      const socketHandler = socket.handlers[value];
      const event = MESSAGES[value as keyof typeof MESSAGES];

      const eventListener = (data: unknown) => {
        socketHandler({
          e: data as WsAckResponse<unknown>,
          queryClient,
          user: session?.user!,
        });
      };

      socket.client.on(event, eventListener);
      listeners.push({ event, handler: eventListener });
    });

    return () => {
      listeners.forEach(({ event, handler }) => {
        socket.client.off(event, handler);
      });
      socket.client.disconnect();
      setIsSocketConnected(false);
    };
  }, []);

  return { isConnected: isSocketConnected };
};

export { useSocket };
