const express = require('express');
const router = express.Router();
const outpassController = require('../controllers/outpassController');
const authMiddleware = require('../middleware/authMiddleware');

console.log('Initializing outpass routes...');

// Change this line to match the client's request
router.post('/', authMiddleware, (req, res, next) => {
  console.log('POST /api/outpass - Request received:', req.body);
  outpassController.createOutpass(req, res, next);
});

router.get('/status/:id', authMiddleware, (req, res, next) => {
  console.log('GET /status/:id - Request received for ID:', req.params.id);
  outpassController.getOutpassStatus(req, res, next);
});

router.get('/student', authMiddleware, (req, res, next) => {
  console.log('GET /student - Request received for user:', req.user.id);
  outpassController.getStudentOutpasses(req, res, next);
});

console.log('Outpass routes established.');

module.exports = router;