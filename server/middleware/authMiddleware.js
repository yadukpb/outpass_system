const jwt = require('jsonwebtoken');

module.exports = function authMiddleware() {
  return (req, res, next) => {
    console.log('Entering authMiddleware');
    try {
      console.log('Headers:', JSON.stringify(req.headers));
      const authHeader = req.headers && req.headers['authorization'];
      console.log('Auth header:', authHeader);

      if (!authHeader) {
        console.log('No authorization header found');
        return res.status(401).json({ message: 'No token, authorization denied' });
      }

      const token = authHeader.replace('Bearer ', '');
      console.log('Extracted token:', token);

      console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', JSON.stringify(decoded));

      req.user = decoded.user;
      console.log('User set on request:', JSON.stringify(req.user));
      console.log('Calling next middleware');
      next();
    } catch (error) {
      console.error('Error in authMiddleware:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);

      if (res && typeof res.status === 'function') {
        console.log('Sending 401 response');
        res.status(401).json({ message: 'Token is not valid' });
      } else {
        console.error('Unable to send response, res object is not available');
        console.log('res object:', res);
        if (typeof next === 'function') {
          console.log('Calling next with error');
          next(error);
        } else {
          console.error('next is not a function, unable to pass error');
          console.log('next:', next);
        }
      }
    }
    console.log('Exiting authMiddleware');
  };
};