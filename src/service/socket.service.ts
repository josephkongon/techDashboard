import { io, Socket } from "socket.io-client";

export class SocketService {
  private readonly socket: Socket;
  private static instances: Record<string, SocketService> = {};

  constructor() {
    const resolvedBaseUrl = import.meta.env.VITE_API_URL;

    this.socket = io(resolvedBaseUrl.replace("/api/v1", ""), {
      path: "/api/v1/ws",
      transports: ["websocket", "polling"],
      auth: {
        // token: url
      },
    });

    SocketService.instances["websocket"] = this;
  }

  getConnection() {
    return this.socket;
  }

  static getInstance() {
    return SocketService.instances["websocket"];
  }
}
