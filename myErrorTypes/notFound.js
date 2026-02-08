class NotFoudError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}
