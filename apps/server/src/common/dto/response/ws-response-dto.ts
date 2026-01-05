class WsResponse<T = undefined> {
  data: unknown;
  success: boolean = true;
  timestamp: number;

  constructor(data?: T) {
    this.data = data;
    this.timestamp = new Date().getTime();
  }
}

export { WsResponse };
