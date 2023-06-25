const jwt = require('jsonwebtoken');
const createError = require('./error');

const verfyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return next(createError(401, 'You are not Authenticated '));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(createError(402, 'Token Not Valid'));
    }
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verfyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return next(createError(403, 'You are not authorises'));
    }
  });
};
module.exports = { verifyUser };
