const { SHA256 } = require("crypto-js");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const password = "kalyan";

// bcrypt.genSalt(5, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   })
// })

const cryptoPassword =
  "$2a$05$/93rA8.1jOssjC.8QW0NU.QgSVf1Wgt/xgWgmG8sYabCyhafDeJse";

bcrypt.compare(password, cryptoPassword, (err, res) => console.log(res));
// const data = {
//   id: 123
// };

// const token = jwt.sign(data, 'secret');
// console.log(token);

// const decoded = jwt.verify(token, 'secret');
// console.log(decoded);

// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "secret_msg").toString()
// };

// //middle man

// // token.data = 143;
// // token.hash = SHA256(JSON.stringify(data)).toString();

// //api side

// const resultHash = SHA256(JSON.stringify(token.data) + "secret_msg").toString();

// if (resultHash === token.hash) {
//   console.log("perfect");
// } else {
//   console.log("middle man");
// }
