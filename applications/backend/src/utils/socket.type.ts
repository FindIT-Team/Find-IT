import { Socket as S } from 'socket.io';
import { IncomingMessage } from 'http';

interface Request extends IncomingMessage, Express.Request {}

export interface Socket extends S {
  request: Request;
}
