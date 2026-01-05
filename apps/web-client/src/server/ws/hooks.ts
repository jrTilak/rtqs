import { useEffect } from "react";
import { socket } from "./socket";
import { MESSAGES } from "./play-quiz/messages";

const useSocket = (
  { events = [] }: { events: (keyof typeof MESSAGES)[] } = { events: [] }
) => {
  useEffect(() => {
    if (socket.client.connected) {
      console.log("Socket already connected", socket.client.id);
      return;
    }

    const connection = socket.client.connect();
    console.log("Socket connecting...", connection.id);

    events.forEach((value) => {
      const handler = socket.handlers[value];
      const event = MESSAGES[value as keyof typeof MESSAGES];

      socket.client.on(event, handler);
    });

    return () => {
      socket.client.disconnect();

      events.forEach((value) => {
        const handler = socket.handlers[value];
        const event = MESSAGES[value as keyof typeof MESSAGES];

        socket.client.off(event, handler);
      });
    };
  }, []);
};

export { useSocket };
