class ValidationError extends Error {
  constructor(message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.stack = new Error().stack;
  }
}

export default ValidationError;
