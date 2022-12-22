import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/Replace';

interface CompletionData {
  goalId: string;
  date: Date;
}

export class Completion {
  private data: CompletionData;
  private _id: string;

  constructor(
    data: Replace<
      CompletionData,
      {
        date?: Date;
      }
    >,
    id?: string,
  ) {
    this.data = {
      ...data,
      date: data.date ?? new Date(),
    };
    this._id = id ?? randomUUID();
  }

  get id(): string {
    return this._id;
  }

  public get goalId(): string {
    return this.data.goalId;
  }

  public set goalId(value: string) {
    this.data.goalId = value;
  }

  public get date(): Date {
    return this.data.date;
  }

  public set date(value: Date) {
    this.data.date = value;
  }
}
