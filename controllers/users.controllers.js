
const catchAsync = require('../utils/catchAsync');
const Formatter = require('../service/encrypt');
const ifsc = require('ifsc');
const users = require('../model/users')


const RegisterDetails = catchAsync(async (req, res, next) => {
  try {
    const values = req.body
    if (values.mobile !== '' && values.mobile !== undefined && values.mobile !== null) {
      const Userdetails = await users.findOne({ mobile: values.mobile });
      if (Userdetails) {
        const errcode = new Error("Mobile No Already Exits");
        errcode.statusCode = 404;
        return next(errcode);
      } else {
        if (values.hasOwnProperty("Bank")) {
          let BankKeys = [];
          values.Bank.accountholdername = values.Bank.accountholdername.toUpperCase();
          values.Bank.ifsccode = values.Bank.ifsccode.toUpperCase();
          values.Bank.bankname = values.Bank.bankname.toUpperCase();
          values.Bank.branchname = values.Bank.branchname.toUpperCase();
          for (var k in values.Bank) BankKeys.push(k);
          for (each in BankKeys) {
            if (values.Bank[BankKeys[each]] != "") {
              if (typeof values.Bank[BankKeys[each]] != "object") {
                values.Bank[BankKeys[each]] = Formatter.encrypt(values.Bank[BankKeys[each]]);
              }
            }
          }
        }

        const User = await users.create(values)
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


const GetBankDetailsWithIFSC = catchAsync(async (req, res, next) => {
  let values = req.body;
  ValidateIFSCCode(values).then((Result) => {
    res.send(Result);
    console.log(Result);
  }).catch((error) => {
    const errcode = new Error(error.message);
    errcode.statusCode = 201;
    return next(errcode);
  });
});

const ValidateIFSCCode = (values) => {
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      try {
        let ifsccode = values.ifsccode;
        if (ifsccode != '' && ifsccode != null && ifsccode != undefined) {
          let validateIFSCcode = ifsc.validate(ifsccode);
          if (validateIFSCcode) {
            ifsc.fetchDetails(ifsccode).then(function (res) {
              resolve(res)
            });
          } else {
            reject({
              code: 201,
              success: false,
              message: "Invalid IFSC Code..",
              timestamp: new Date()
            });
          }
        } else {
          reject({
            code: 201,
            success: false,
            message: "IFSC Code required or Invalid.",
            timestamp: new Date()
          });
        }
      } catch (error) {
        reject({
          code: 201,
          success: false,
          message: "DATABASE_ERROR.",
          timestamp: new Date()
        });
      }
    });
  });
}

module.exports = {
  RegisterDetails,
  GetBankDetailsWithIFSC
}