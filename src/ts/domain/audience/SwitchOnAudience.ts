import { Role } from "../Role";
import { User } from "../User";
import { SwitchOnWebSocket } from "../SwitchOnWebSocket";

export enum AnswerType {
  yes = 'yes',
  no = 'no',
  none = 'none'
}

export class CurrentAnswer {
  public value: AnswerType = AnswerType.none
}

export class SwitchOnAudience {
  readonly user: User = new User(`u${Date.now()}`, Role.audience);
  constructor(private switchOnWebSocket: SwitchOnWebSocket, readonly currentAnswer: CurrentAnswer) {
  }
  openWebSocket(callback:(error) => void) {
    this.switchOnWebSocket.openWebSocket(callback);
    this.switchOnWebSocket.onClearAnswers = () => {
      this.currentAnswer.value = AnswerType.none;
    }
  }
  yes() {
    this.currentAnswer.value = AnswerType.yes;
    this.switchOnWebSocket.yes(this.user);
  }
  no() {
    this.currentAnswer.value = AnswerType.no;
    this.switchOnWebSocket.no(this.user);
  }
}
