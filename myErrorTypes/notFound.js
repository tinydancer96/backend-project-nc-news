class NotFoundError extends Error {
  constructor(message, location) {
    super(message);
    // this.name = "NotFoundError";
    this.location = location;
    this.status = 404;
  }
}

module.exports = NotFoundError;
