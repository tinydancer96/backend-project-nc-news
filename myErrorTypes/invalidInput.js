class InvalidInputError extends Error {
  constructor(message, location) {
    super(message);
    this.location = location;
    // this.name = "InvalidInputError";
    this.status = 400;
  }
}

module.exports = InvalidInputError;
