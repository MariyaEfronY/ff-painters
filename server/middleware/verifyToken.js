import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.painterId = decoded.id; // ✅ this is what the controller uses
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default verifyToken;
