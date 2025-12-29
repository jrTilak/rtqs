import { useEffect } from "react";
import { socket } from ".";

const useSocket = () => {
  useEffect(() => {
    if (socket.client.connected) return;

    socket.client.connect();
    Object.entries(socket.handlers).forEach(([event, handler]) => {
      socket.client.on(event, handler);
    });

    return () => {
      socket.client.disconnect();
      Object.entries(socket.handlers).forEach(([event, handler]) => {
        socket.client.off(event, handler);
      });
    };
  }, []);
};

export { useSocket };
