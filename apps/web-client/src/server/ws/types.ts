export type WsAckError = {
  message: string;
  success: false;
  timestamp: number;
};

export type WsAckSuccess<T = undefined> = {
  data: T;
  success: true;
  timestamp: number;
};

export type WsAckResponse<T = undefined> = WsAckSuccess<T> | WsAckError;
