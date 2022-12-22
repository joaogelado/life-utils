export class PastDateError extends Error {
  constructor(field: string) {
    super(`Past Date Error: ${field} cannot be in the future`);
  }
}
