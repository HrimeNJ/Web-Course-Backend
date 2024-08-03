import { WSController, OnWSConnection, OnWSMessage } from '@midwayjs/core';
import { Context } from '@midwayjs/ws';

@WSController('/ws')
export class WebSocketServer {

  @OnWSConnection()
  public async connect(socket: Context) {
    console.log('WebSocket connection established');
    socket.send('Welcome to WebSocket server!');
    socket.send("Welcome to Backend!");
  }

  @OnWSMessage('message')
  public async receive(socket: Context, message: string) {
    console.log(`Received message: ${message}`);
    if(socket.readyState == WebSocket.OPEN)
        socket.send(`Echo: ${message}`);
    else {
        console.log("WebSocket connection is closed");
    }
  }
}
