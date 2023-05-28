'use strict';

const base64 = require('base-64');
const { User } = require('./models/index.js');
module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return authError(res);
  }
  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = [];
  try {
    [user, pass] = base64.decode(basic).split(':');
  } catch (error) {
    return next('invalid login');
  }
  try {
    req.user = await User.authenticateBasic(user, pass);
    next();
  } catch (error) {
    next('not a valid login');
  }
};

function authError(res) {
  res.status(403).send('Invalid Login');
}