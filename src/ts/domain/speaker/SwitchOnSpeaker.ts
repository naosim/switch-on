import { Role } from "../Role";
import { User } from "../User";
import { Answer } from "../Answer";
import { SwitchOnWebSocket } from "../SwitchOnWebSocket";
import { Answers } from "./Answers";
export class SwitchOnSpeaker {
  readonly user: User = new User(`u${Date.now()}`, Role.speaker);
  readonly answers: Answers = new Answers();
  constructor(private switchOnWebSocket: SwitchOnWebSocket) {
    this.switchOnWebSocket.onAnswer = (_, answer: Answer) => {
      this.answers.add(answer);
    };
  }
  openWebSocket(callback:(error) => void) {
    this.switchOnWebSocket.openWebSocket(callback);
  }
  closeWebSocket() {
    this.switchOnWebSocket.closeWebSocket();
  }
  clearAnswers() {
    this.switchOnWebSocket.clearAnswers(this.user);
    this.answers.clear();
  }
}
