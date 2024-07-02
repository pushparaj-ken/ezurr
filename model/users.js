var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

var UsersSchema = new Schema({
  id: { type: String, default: "", required: false },
  name: { type: String, default: "", required: true },
  age: { type: String, default: "", required: true },
  gender: { type: String, default: "", required: true },
  countrycode: { type: String, default: "", required: true },
  mobile: { type: Number, default: 0, required: true },
  Address: {
    city: { type: String, default: "", required: false },
    pincode: { type: Number, default: 0, required: false },
    state: { type: String, default: "", required: false },
  },
  instaId: { type: String, default: "", required: false },
  facebookId: { type: String, default: "", required: false },
  AtsSocialMedia: { type: String, default: "", required: false },
  profession: { type: String, default: "", required: false },
  Bank: {
    accountholdername: { type: String, default: "", required: true },
    accountnumber: { type: String, default: "", required: true },
    ifsccode: { type: String, default: "", required: true },
    bankname: { type: String, default: "", required: true },
    branchname: { type: String, default: "", required: true },
    accounttype: { type: String, default: "", required: true },
    swiftcode: { type: String, default: "", required: false },
  },
  status: { type: Number, default: 0, required: false },
  createdBy: { type: String, default: "", required: false },
  updatedBy: { type: String, default: "", required: false },
},
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
)


UsersSchema.pre('save', function (next) {
  this.id = this._id;
  return next();
});

UsersSchema.methods.getJWTToken = function () {
  const expiresInMinutes = process.env.JWT_EXPIRE;
  const expirationTimeInSeconds = expiresInMinutes * 60;

  //const expirationTimestamp = Math.floor(Date.now() / 1000) + expirationTimeInSeconds;
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: expirationTimeInSeconds,
  });
};


module.exports = mongoose.model('Users', UsersSchema);