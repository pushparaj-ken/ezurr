const moment = require('moment');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; // Symmetric encryption algorithm with CBC mode
const key = Buffer.from("785a537b1f115070a5e7a22c19352fd07d21e8f9816c37a9e6fcb5b43212fc4a", 'hex');
const iv = Buffer.from("233b017be22272decac3e7ee47391fa2", 'hex');


const toDate = (dateInput) => {
  return moment(dateInput).format("DD-MM-YYYY");
};


const toTime = (timeInput) => {

  return moment(timeInput).format('HH:mm:ss');
};

function encrypt(data) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
  return encrypted
}

function decrypt(data) {
  let decryptedData;
  try {
    // Try to decrypt with the new method
    // const decipher = crypto.createDecipher(oldAlgorithm, oldKey);
    // decryptedData = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decryptedData = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
  } catch (error) {
    // If decryption with the new method fails, try with the old method
    decryptedData = "";
  }
  return decryptedData;
}


module.exports = {
  toDate,
  toTime,
  encrypt,
  decrypt,
}