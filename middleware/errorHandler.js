const { constants } = require("../constant");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Bad request/Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Un Authorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      case constants.SERVER_ERR:
        res.json({
          title: "Server Error",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
    default:
      res.json({
        title: "No error, all good",
      });
  }
};

module.exports = errorHandler;
