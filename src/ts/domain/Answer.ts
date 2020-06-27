import { User } from "./User";
export class Answer {
  public isNo: boolean;
  private constructor(readonly user: User, public isYes: boolean) {
    this.isNo = !isYes;
  }
  static yes(user: User): Answer { return new Answer(user, true); }
  ;
  static no(user: User): Answer { return new Answer(user, false); }
  ;
}
