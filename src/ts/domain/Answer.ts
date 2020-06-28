import { User } from "./User";
import { EventId } from "./EventId";
export class Answer {
  public isNo: boolean;
  private constructor(readonly eventId: EventId, readonly user: User, public isYes: boolean, readonly timestamp: number) {
    this.isNo = !isYes;
  }
  static yes(user: User, timestamp: number): Answer { return new Answer(EventId.create(user, timestamp), user, true, timestamp); }
  static no(user: User, timestamp: number): Answer { return new Answer(EventId.create(user, timestamp), user, false, timestamp); }
}
