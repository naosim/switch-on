import { Answer } from "../Answer";
export class Answers {
  values: Answer[] = [];
  get yesCount(): number {
    return this.values.filter(v => v.isYes).length;
  }
  get noCount(): number {
    return this.values.filter(v => v.isNo).length;
  }
  get totalCount(): number {
    return this.values.length;
  }
  add(answer: Answer) {
    this.values.push(answer);
  }
  clear() {
    this.values = [];
  }
}
