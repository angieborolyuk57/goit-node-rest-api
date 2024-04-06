const messageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
<<<<<<< HEAD
}

const HttpError = (status, message = errorMessageList[status]) => {
  const error = new Error(message)
  error.status = status
  return error
}

=======
};

class HttpError extends Error {
  constructor(status, message = messageList[status]) {
    super(message);
    this.status = status;
  }
}

>>>>>>> 3ac0428 (added controllers, schema and model for auth, error handling)
module.exports = HttpError;
