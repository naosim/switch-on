import { SwitchOnWebSocket } from "../domain/SwitchOnWebSocket";
import { Answer } from "../domain/Answer";
import { User } from "../domain/User";

export class SwitchOnWebSocketImpl implements SwitchOnWebSocket {
  private socket?: WebSocket;
  private keepaliveIntervalId?: number;
  public onOpened: (switchOn: SwitchOnWebSocket) => void = () => { };
  public onAnswer: (switchOn: SwitchOnWebSocket, answer: Answer) => void = () => { };
  public onClearAnswers: (switchOn: SwitchOnWebSocket) => void = () => { };
  constructor(readonly url: string) { }
  openWebSocket() {
    if (this.socket) {
      this.closeWebSocket();
    }
    const socket = new WebSocket(this.url);
    this.socket = socket;
    console.log(socket);
    socket.addEventListener('open', (event) => {
      console.log('open', event);
      // keepalive
      this.keepaliveIntervalId = setInterval(() => socket.send('{"type":"keepalive"}'), 60 * 1000);
      if (this.onOpened)
        this.onOpened(this);
    });
    socket.addEventListener('message', (event) => {
      console.log('message', event);
      var data = JSON.parse(event.data);
      console.log(data);
      if (data.type == 'keepalive') {
        return;
      }
      if (data.type == 'answer') {
        var user = new User(data.userId, data.role);
        var answer = data.answer == 'yes' ? Answer.yes(user) : Answer.no(user);
        this.onAnswer(this, answer);
      }
      if (data.type == 'clearAnswers') {
        this.onClearAnswers(this);
      }
    });
  }
  closeWebSocket() {
    clearInterval(this.keepaliveIntervalId);
    this.socket.close();
  }
  yes(user: User) {
    var obj = { type: 'answer', answer: 'yes', userId: user.userId, role: user.role };
    this.socket.send(JSON.stringify(obj));
  }
  no(user: User) {
    var obj = { type: 'answer', answer: 'no', userId: user.userId, role: user.role };
    this.socket.send(JSON.stringify(obj));
  }
  clearAnswers(user: User) {
    var obj = { type: 'clearAnswers', userId: user.userId, role: user.role };
    this.socket.send(JSON.stringify(obj));
  }
}