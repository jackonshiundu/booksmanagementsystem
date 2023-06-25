const User = require('../model/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('../middlewares/error');
const signup = async (req, res, next) => {
  const { name, password, email } = req.body;

  try {
    if (!name && !password && !email) {
      return next(createError(404, 'Please Fill in all the credentials'));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(404, 'Email already exixts'));
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    const results = await User.create({
      name,
      password: hashedPassword,
      email,
    });

    const token = jwt.sign(
      {
        email: results.email,
        id: results._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: results, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//signing in the users
const signin = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    if (!password && !email) {
      return next(createError(404, 'Please Fill in all the credentials'));
    }
    const oldUser = await User.findOne({ email: email });

    if (!oldUser) {
      return next(createError(404, 'No user With such an Email'));
    }
    const decryptedPassword = await bcryptjs.compare(
      password,
      oldUser.password
    );
    if (!decryptedPassword) {
      return next(createError(404, 'Password Dont,t Match'));
    }
    const token = jwt.sign(
      {
        email: oldUser.email,
        id: oldUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin };
