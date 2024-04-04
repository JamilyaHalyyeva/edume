import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/env.config.js';
import sentAnEmailForResetPassword from '../utils/forgotPassword.js';

export const handleRegister = async (req, res) => {
  try {
    const {
      username,
      surname,
      email,
      password,
      role,
      grade,
      avatar,
      teacherClassTypeGrades,
    } = req.body;

    console.log('register: data is ', req.body);

    if (!username || !surname || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      surname,
      email,
      password: hashedPassword,
      role,
      avatar,
      grade,
      teacherClassTypeGrades,
    });
    const result = await newUser.save();

    console.log('User is registered', result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const handleLogin = async (req, res) => {
  try {
    console.log('login: data is ', req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email }).populate('grade');
    console.log('user:', user);

    if (!user) {
      return res.send({
        success: false,
        error: 'Email or password is incorrect',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('isMatch is ', isMatch);

    if (!isMatch) {
      return res.send({
        success: false,
        error: 'Email or password not correct',
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        userName: user.username,
        surname: user.surname,
        role: user.role,
        avatar: user.avatar,
        grade: user.grade,
        teacherClassTypeGrades: user.teacherClassTypeGrades,
      },
      config.jwtSecret,
      {
        expiresIn: '1d',
      },
    );
    console.log('token is ', token);
    res.json({ success: true, token: token });
  } catch (error) {
    console.log('error in login  ', error.message);
    return res.status(500).send({ success: false, error: error.message });
  }
};

export const handleForgotPassword = async (req, res) => {
  try {
    console.log('forgot password: data is ', req.body);
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    console.log('user:', user);

    const token = jwt.sign({ email: user.email }, config.jwtSecret, {
      expiresIn: '1d',
    });

    //sentAnEmailForResetPassword(email, token);
    sentAnEmailForResetPassword(token, user.email);
    console.log('token is ', token);

    res.json({ success: true, token: token });
  } catch (error) {
    return res.status(500).send({ success: false, error: error.message });
  }
};

export const handleChangeForgotPassword = async (req, res) => {
  try {
    console.log('change forgot password: data is ', req.body);
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    console.log('decoded is ', decoded);

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    console.log('user:', user);

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.log('Error in change forgot password page ', error.message);
    return res.status(500).send({ success: false, error: error.message });
  }
};
