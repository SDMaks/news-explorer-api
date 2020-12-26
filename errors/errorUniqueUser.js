class ErrorUniqueUser extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = message;
    console.log(this.message);
  }
}

module.exports = ErrorUniqueUser;
