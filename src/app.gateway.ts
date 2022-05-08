import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { from, map, Observable } from 'rxjs';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:5000',
    ],
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger("AppGateway");

  @WebSocketServer() server: Server

  /**
   * after init
   * @param server 
   */
  afterInit(server: Server) {
    
  }

  /**
   * handle connection
   * @param client 
   * @param args 
   */
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`connection at ${client.id} `)

    client.emit(
      'message',
      {
        message: "hello world"
      }
    )
  }

  /**
   * handle disconnect
   * @param client 
   */
  handleDisconnect(client: Socket) {
    this.logger.log(`disconnect at ${client.id} `);
    console.log(`disconnect at ${client.id} `)
  }
}
