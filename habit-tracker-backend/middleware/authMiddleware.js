// // middleware/authMiddleware.js

// const jwt = require('jsonwebtoken');

// const auth = (req, res, next) => {
// const token = req.headers.authorization?.split(' ')[1];
// if (!token) return res.status(401).json({ message: 'Access denied' });

// try {
// const decoded = jwt.verify(token, process.env.JWT_SECRET);
// req.user = decoded; // { id: user._id }
// next();
// } catch {
// return res.status(401).json({ message: 'Invalid token' });
// }
// };

// module.exports = auth;


const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("Received Token:", token); // debug

  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // debug
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Verification Failed:", err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
