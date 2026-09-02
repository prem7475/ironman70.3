const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const header = req.header('Authorization');
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(header.substring(7), process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid or expired token' });
  }
};

module.exports.admin = function admin(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ msg: 'Admin access required' });
  }
  next();
};