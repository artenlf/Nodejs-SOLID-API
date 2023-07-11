export class ExpiredCheckInValidationError extends Error {
  constructor() {
    super('Cannot validate check-in 20 minutes after its creation.')
  }
}
