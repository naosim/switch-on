import { Role } from "./Role";
export class User {
  constructor(
    readonly userId: string, 
    readonly role: Role
  ) { }
}
