
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (statusCode === 401) {
    return res.status(401).json({
      success: false,
      code: 401,
      status: err.message || 'Unauthorized',
      timestamp: new Date()
    });
  }

  if (statusCode === 404) {
    return res.status(404).json({
      success: false,
      code: 401,
      status: err.message || 'NotFoundError: Not Found',
      timestamp: new Date()
    });
  }

  if (statusCode === 200) {
    let responseData = {
      success: true,
      code: 200,
      status: err.message,
      timestamp: new Date()
    };

    if (err.data) {
      responseData.Data = err.data;

    }
    return responseData;
  }

  res.status(statusCode).json({

    success: false,
    code: statusCode,
    message: err.message || 'Internal Server Error',
    timestamp: new Date()
  });
};

module.exports = errorHandler;