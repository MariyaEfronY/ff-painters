// utils/createToken.js

import jwt from 'jsonwebtoken';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'mySecret', {
    expiresIn: '7d',
  });
};

export default createToken;
