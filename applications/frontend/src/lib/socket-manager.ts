import { Manager } from 'socket.io-client';

export const SocketManager = new Manager(process.env.NEXT_PUBLIC_SOCKET_ENTRY, {
  withCredentials: true,
  autoConnect: false,
});
