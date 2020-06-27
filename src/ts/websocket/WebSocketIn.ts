export class WebSocketIn {
  constructor(public channel: string, public apiKey: string) { }
  get url() {
    return `wss://connect.websocket.in/v3/${this.channel}?apiKey=${this.apiKey}`;
  }
}
