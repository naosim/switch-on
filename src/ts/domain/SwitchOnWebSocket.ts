import { User } from "./User";
import { Answer } from "./Answer";
/**
 * スイッチオンのwebsocketラッパー
 * 環境に依存するため、インターフェースと実装を分離する
 */
export interface SwitchOnWebSocket {
  onOpened: (switchOn: SwitchOnWebSocket) => void;
  onAnswer: (switchOn: SwitchOnWebSocket, answer: Answer) => void;
  onClearAnswers: (switchOn: SwitchOnWebSocket) => void;
  openWebSocket();
  closeWebSocket();
  yes(user: User);
  no(user: User);
  clearAnswers(user: User);
}
