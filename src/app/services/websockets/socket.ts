import { AbsintheSocket, create } from '@absinthe/socket';
import { Socket as PhoenixSocket } from 'phoenix';

let socket: AbsintheSocket | null = null;

export const reconnectSocket = () => {
  if (process.env.REACT_APP_WEBSOCKET_URL) {
    socket = create(new PhoenixSocket(process.env.REACT_APP_WEBSOCKET_URL));
  } else {
    throw 'REACT_APP_WEBSOCKET_URL is not filled';
  }
};

export const getSocket = () => {
  if (!socket) {
    reconnectSocket();
  }

  return socket;
};
