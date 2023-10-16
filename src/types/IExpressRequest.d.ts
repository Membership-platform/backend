import { Request } from 'express';
import { Server as SocketIoServer } from 'socket.io';

export default interface ExpressRequest extends Request {
  io?: SocketIoServer;
}
