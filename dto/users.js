const { IsString, IsNotEmpty } = require('class-validator');

class UserValidator {
  @IsString()
  @IsNotEmpty()
  mobile;

}

module.exports = UserValidator;