import { Socket as S } from 'socket.io';
import { Express } from 'express';

export type Socket = S & {
  request: Express.Request;
};
