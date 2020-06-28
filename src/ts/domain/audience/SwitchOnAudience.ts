import { Role } from "../Role";
import { User } from "../User";
import { SwitchOnWebSocket } from "../SwitchOnWebSocket";
export class SwitchOnAudience {
  readonly user: User = new User(`u${Date.now()}`, Role.audience);
  constructor(private switchOnWebSocket: SwitchOnWebSocket) {
  }
  openWebSocket(callback:(error) => void) {
    this.switchOnWebSocket.openWebSocket(callback);
  }
  yes() {
    this.switchOnWebSocket.yes(this.user);
  }
  no() {
    this.switchOnWebSocket.no(this.user);
  }
}
