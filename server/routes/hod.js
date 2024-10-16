const express = require('express');
const router = express.Router();
const hodController = require('../controllers/hodController');
const authMiddleware = require('../middleware/authMiddleware');

console.log('Initializing HOD routes...');

router.get('/pending', authMiddleware, (req, res, next) => {
  console.log('GET /api/hod/pending - Request received');
  hodController.getPendingOutpasses(req, res, next);
});

router.put('/approve/:id', authMiddleware, (req, res, next) => {
  console.log('PUT /api/hod/approve/:id - Request received for ID:', req.params.id);
  hodController.approveOutpass(req, res, next);
});

router.put('/reject/:id', authMiddleware, (req, res, next) => {
  console.log('PUT /api/hod/reject/:id - Request received for ID:', req.params.id);
  hodController.rejectOutpass(req, res, next);
});

router.get('/stats', authMiddleware, (req, res, next) => {
  console.log('GET /api/hod/stats - Request received');
  hodController.getStats(req, res, next);
});

console.log('HOD routes established.');

module.exports = router;