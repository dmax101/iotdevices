const base64Url = require('base64-url');

const header = {
  alg: 'HS256', // Hmac + sha256,
  typ: 'JWT',
};

// corpo de dados
const payload = {
  username: 'user1@user.com',
  name: 'Danilo Ribeiro',
  exp: new Date().getTime(), // timestamp
};

const key = process.env.SECRET_KEY;

const headerEncoded = base64Url.encode(JSON.stringify(header))

const payloadEncoded = base64Url.encode(JSON.stringify(payload))

console.log(headerEncoded, payloadEncoded);

const crypt = require('node:crypto');

const signature = crypt
  .createHmac('sha256', key)
  .update(`${headerEncoded}.${payloadEncoded}`)
  .digest('bin');

console.log(
  `${headerEncoded}.${payloadEncoded}.${base64Url.encode(signature)}`,
);

const jwt = require('jsonwebtoken')

const value = jwt.sign({
    payload
  }, key, { expiresIn: '1h' });

console.log(value);

const verify = jwt.verify(value, key)

console.log(verify);