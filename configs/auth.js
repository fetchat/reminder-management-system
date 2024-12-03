const jwt = require('jsonwebtoken');

const JWT_SECRET = 'thisisasamplesecretkey';
const JWT_EXPIRES_IN = '1d';

/**
 * Middleware to verify JWT token
 * @param {Request} request
 * @param {Response} reply
 * @param {Function} next
 */
exports.verifyToken = async(request, reply, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return reply
      .status(401)
      .json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return reply.status(403).json({ message: "Forbidden: Invalid token" });
    }
    request.user = user;
    next();
  });
};

/**
 * Generate JWT token
 * @param {object} payload
 * @param {object} options
 */
exports.getToken = async(data, options) => {
  const token = jwt.sign(
    data,
    JWT_SECRET,
    options || { expiresIn: JWT_EXPIRES_IN }
  );
  return token;
};