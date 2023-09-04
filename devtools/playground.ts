const bcrypt = require('bcrypt');

const saltRounds = 10;
const password = 'senhadodanilo';
let hashPassword = '';

bcrypt.genSalt(saltRounds, function (err, salt) {
  bcrypt.hash(password, salt, function (err, hash) {
    hashPassword = hash;
    console.log(hash);
  });
});

console.log(hashPassword);
