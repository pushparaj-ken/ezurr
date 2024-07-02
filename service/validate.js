// middleware/validationMiddleware.js
const { plainToClass } = require('class-transformer');
const { validate } = require('class-validator');

function validationMiddleware(dtoType) {
  return async function (req, res, next) {
    try {
      const dto = plainToClass(dtoType, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        const errorMessages = errors.map(error => Object.values(error.constraints)).flat();
        return res.status(400).json({ errors: errorMessages });
      }
      req.dto = dto; // Attach validated DTO to request object for further processing
      next();
    } catch (error) {
      next(error); // Forward error to global error handler
    }
  };
}

module.exports = validationMiddleware;
