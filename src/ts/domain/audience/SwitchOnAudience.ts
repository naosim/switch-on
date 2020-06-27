import { Role } from "../Role";
import { User } from "../User";
import { SwitchOnWebSocket } from "../SwitchOnWebSocket";
export class SwitchOnAudience {
  readonly user: User = new User(`u${Date.now}`, Role.audience);
  constructor(private switchOnWebSocket: SwitchOnWebSocket) {
  }
  openWebSocket() {
    this.switchOnWebSocket.openWebSocket();
  }
  closeWebSocket() {
    this.switchOnWebSocket.closeWebSocket();
  }
  yes() {
    this.switchOnWebSocket.yes(this.user);
  }
  no() {
    this.switchOnWebSocket.no(this.user);
  }
}
