class WsError {
  message: string;
  success: boolean = false;
  timestamp: number;

  constructor(message: string) {
    this.message = message;
    this.timestamp = new Date().getTime();
  }
}

export { WsError };
