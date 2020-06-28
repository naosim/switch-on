import { SwitchOnWebSocket } from "../domain/SwitchOnWebSocket";
import { Answer } from "../domain/Answer";
import { User } from "../domain/User";
import { EventId } from "../domain/EventId";

export class SwitchOnWebSocketImpl implements SwitchOnWebSocket {
  private socket?: WebSocket;
  private keepaliveIntervalId?: number;
  public onOpened: (switchOn: SwitchOnWebSocket) => void = () => { };
  public onAnswer: (switchOn: SwitchOnWebSocket, answer: Answer) => void = () => { };
  public onClearAnswers: (switchOn: SwitchOnWebSocket) => void = () => { };
  private sendingList = [];
  constructor(readonly url: string, readonly isSpeaker: boolean) {
    // 再送信ループ
    setInterval(()=>{
      if(this.sendingList.length == 0 || !this.socket || this.socket.readyState != WebSocket.OPEN) {
        return;
      }
      this.sendingList.forEach(obj => this.socket.send(JSON.stringify(obj)))
      console.log('再送信');

    }, 3000);

  }
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

      if (this.onOpened) {
        this.onOpened(this);
      }
        
    });
    socket.addEventListener('message', (event) => {
      // console.log('message', event);
      var data = JSON.parse(event.data);
      console.log(data);
      if (data.type == 'keepalive') {
        return;
      }
      if (data.type == 'answer') {
        var user = new User(data.userId, data.role);
        var timestamp = data.timestamp as number;
        var answer = data.answer == 'yes' ? Answer.yes(user, timestamp) : Answer.no(user, timestamp);
        this.onAnswer(this, answer);
        if(this.isSpeaker) {
          this.socket.send(JSON.stringify({type: 'response', id: data.id}));
        }
      }
      if (data.type == 'clearAnswers') {
        this.onClearAnswers(this);
      }
      if(data.type == 'response') {
        this.sendingList = this.sendingList.filter(v => v.id != data.id);
      }
    });

    socket.addEventListener('error', (e) => { console.log('error', e) })
    socket.addEventListener('close', (e) => {
      console.log('close', e);

    })
  }
  throwIfNotOpen() {
    if(!this.socket) {
      throw 'websocketを起動していない';
    }
    if(this.socket.readyState == WebSocket.OPEN) {
      return;
    }
    if(this.socket.readyState == WebSocket.CONNECTING) {
      throw 'websocketが接続中です。しばらくお待ちください';
    }
    throw 'websocketが切れています。リロードしてやり直してください';
  }
  closeWebSocket() {
    this.throwIfNotOpen();
    clearInterval(this.keepaliveIntervalId);
    this.socket.close();
  }
  yes(user: User) {
    this.throwIfNotOpen();
    var answer = Answer.yes(user, Date.now())
    this.send({ type: 'answer', answer: 'yes', userId: user.userId, role: user.role, timestamp: answer.timestamp, id: answer.eventId.value });
  }
  no(user: User) {
    this.throwIfNotOpen();
    var answer = Answer.yes(user, Date.now())
    this.send({ type: 'answer', answer: 'no', userId: user.userId, role: user.role, timestamp: answer.timestamp, id: answer.eventId.value });
  }
  clearAnswers(user: User) {
    this.throwIfNotOpen();
    var eventId = EventId.create(user, Date.now()).value
    var obj = { type: 'clearAnswers', userId: user.userId, role: user.role, id: eventId };
    this.socket.send(JSON.stringify(obj));
  }
  send(obj: any) {
    this.sendingList.push(obj);
    this.socket.send(JSON.stringify(obj));
  }
}
