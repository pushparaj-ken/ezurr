
const catchAsync = require('../utils/catchAsync');
const users = require('../model/users')


const RegisterDetails = catchAsync(async (req, res, next) => {
  try {
    const validatedData = req.dto;
    const Values = req.body
    if (Values.mobile !== '' && Values.mobile !== undefined && Values.mobile !== null) {
      const Userdetails = await users.findOne({ mobile: Values.mobile });
      if (Userdetails) {
        const errcode = new Error("Mobile No Already Exits");
        errcode.statusCode = 404;
        return next(errcode);
      } else {
        const User = await users.create(Values)
        const token = await User.getJWTToken();
        res.send({
          success: true,
          code: 200,
          Token: token,
          status: "Data Saved Success",
        });
      }
    } else {
      const errcode = new Error("All Field are Mandatory");
      errcode.statusCode = 404;
      return next(errcode);
    }
  } catch (error) {
    const errcode = new Error(error.stack);
    errcode.statusCode = 201;
    return next(errcode);
  }
});

module.exports = {
  RegisterDetails,
}