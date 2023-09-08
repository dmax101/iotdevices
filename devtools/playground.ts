const bcrypt = require('bcrypt');

const password = 'admin';

const generatePass = async (password) => {
  const saltRounds = 10;

  let hash: string;

  return await bcrypt.genSalt(saltRounds, async (err, salt) => {
    return await bcrypt.hash(password, salt, async (err, hash) => {
      console.log(hash);

      this.hash = hash

      return hash
    });
  });
};

console.log(generatePass(password));

