import jwt from 'jsonwebtoken';
import config from '../config/env.config.js';

export default function authMiddleware(req, res, next) {
  try {
    console.log('here we are token:', req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send({ success: false, error: 'Unauthorized' });
  }
}
