export class CustomHttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequest extends CustomHttpError {
  constructor(message) {
    super(message, 400);
  }
}

export class Unauthenticated extends CustomHttpError {
  constructor(message) {
    super(message, 401);
  }
}

export class Forbidden extends CustomHttpError {
  constructor(message) {
    super(message, 403);
  }
}

export class NotFound extends CustomHttpError {
  constructor(message) {
    super(message, 404);
  }
}
