const express = require('express');
const router = express.Router();
const coordinatorController = require('../controllers/coordinatorController');
const authMiddleware = require('../middleware/authMiddleware');

console.log('Initializing coordinator routes...');

router.get('/pending', authMiddleware, (req, res, next) => {
  console.log('GET /api/coordinator/pending - Request received');
  coordinatorController.getPendingOutpasses(req, res, next);
});

router.put('/approve/:id', authMiddleware, (req, res, next) => {
  console.log('PUT /api/coordinator/approve/:id - Request received for ID:', req.params.id);
  coordinatorController.approveOutpass(req, res, next);
});

router.put('/reject/:id', authMiddleware, (req, res, next) => {
  console.log('PUT /api/coordinator/reject/:id - Request received for ID:', req.params.id);
  coordinatorController.rejectOutpass(req, res, next);
});

router.get('/stats', authMiddleware, (req, res, next) => {
  console.log('GET /api/coordinator/stats - Request received');
  coordinatorController.getStats(req, res, next);
});

console.log('Coordinator routes established.');

module.exports = router;