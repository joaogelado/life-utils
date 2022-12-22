export class InvalidCronLengthError extends Error {
  constructor(got: number, expected: number[]) {
    super(
      `Invalid cron length: got: ${got}, expected one of these: ${expected.join(
        ', ',
      )}`,
    );
  }
}
