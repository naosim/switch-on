import { User } from "./User";

export class EventId {
  constructor(readonly value: string) {

  }
  static create(user: User, timestamp: number): EventId {
    return new EventId(`${user.userId}_t${timestamp}`)
  }
}