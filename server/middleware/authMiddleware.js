import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // or hardcoded key for now
    req.painterId = decoded.id; // ✅ IMPORTANT — this must match how you signed the token
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
