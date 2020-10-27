import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocketEndPoint: string = environment.apiUrl + '/ws';
  topic: string = "/topic/messages-to-client";
  stompClient: any;
  constructor(){
    this._connect();
  }
  _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
        console.log(sdkEvent);
      });
      //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/message-to-server", {}, JSON.stringify(message));
  }

  // onMessageReceived(message) {
  //   console.log("Message Recieved from Server :: " + message);
  //   this.appComponent.handleMessage(JSON.stringify(message.body));
  // }
}


