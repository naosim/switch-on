import { Answer } from "../Answer";
export class Answers {
  valueMap: { [index: string]: Answer; } = {};
  yesCount: number = 0;
  noCount: number = 0;
  totalCount: number = 0;

  notifyUpdate() {
    var ary = Object.values(this.valueMap);
    this.yesCount = ary.filter(v => v.isYes).length;
    this.noCount = ary.filter(v => v.isNo).length;
    this.totalCount = ary.length;
  }

  /**
   * 回答を追加する
   * 同じ人が複数回答した場合、新しい方だけ残る
   * @param answer 
   */
  add(answer: Answer) {
    if(this.valueMap[answer.user.userId]) {
      if(this.valueMap[answer.user.userId].timestamp < answer.timestamp) {
        console.log('update');
        this.valueMap[answer.user.userId] = answer;
        this.notifyUpdate();
      }
    } else {
      console.log('add');
      this.valueMap[answer.user.userId] = answer;
      this.notifyUpdate();
    }
  }
  clear() {
    this.valueMap = {};
    this.notifyUpdate();
  }
}
