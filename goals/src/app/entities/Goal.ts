import { randomUUID } from 'crypto';
import { PastDateError } from '../errors/PastDateError';
import { InvalidCronLengthError } from '../errors/InvalidCronLengthError';
import { Replace } from 'src/helpers/Replace';

export interface GoalData {
  goal: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
}

export class Goal {
  private data: GoalData;
  private _id: string;

  constructor(
    data: Replace<
      GoalData,
      {
        startDate?: Date;
      }
    >,
    id?: string,
  ) {
    this.data = {
      ...data,
      startDate: data.startDate ?? new Date(),
    };
    this._id = id ?? randomUUID();
  }

  get id(): string {
    return this._id;
  }

  public get goal(): string {
    return this.data.goal;
  }

  public set goal(value: string) {
    value = value.trim();

    this.data.goal = value;
  }

  public get frequency(): string {
    return this.data.frequency;
  }

  public set frequency(value: string) {
    value = value.trim();
    const valueWithoutSpaces = value.replace(' ', '');
    const valueLengthWithoutSpaces = valueWithoutSpaces.length;

    const possibleCronValuesWithoutSpaces = [5, 6];

    if (!possibleCronValuesWithoutSpaces.includes(valueLengthWithoutSpaces)) {
      throw new InvalidCronLengthError(
        valueLengthWithoutSpaces,
        possibleCronValuesWithoutSpaces,
      );
    }

    this.data.frequency = value;
  }

  public get startDate(): Date {
    return this.data.startDate;
  }

  public set startDate(value: Date) {
    if (value < new Date()) {
      throw new PastDateError('startDate');
    }

    this.data.startDate = value;
  }

  public get endDate(): Date {
    return this.data.endDate;
  }

  public set endDate(value: Date) {
    if (value < new Date()) {
      throw new PastDateError('endDate');
    }

    this.data.endDate = value;
  }
}
