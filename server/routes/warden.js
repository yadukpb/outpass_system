const express = require('express');
const router = express.Router();
const wardenController = require('../controllers/wardenController');
const authMiddleware = require('../middleware/authMiddleware');

console.log('Warden routes initialized');
router.use(authMiddleware());

router.get('/dashboard', authMiddleware(['warden']), (req, res, next) => {
  console.log('Route: GET /api/warden/dashboard');
  next();
}, wardenController.getWardenDashboardData);

router.put('/approve/:id', authMiddleware(['warden']), (req, res, next) => {
  console.log('Route: PUT /approve/:id', { id: req.params.id });
  next();
}, wardenController.approveOutpass);

router.put('/reject/:id', authMiddleware(['warden']), (req, res, next) => {
  console.log('Route: PUT /reject/:id', { id: req.params.id });
  next();
}, wardenController.rejectOutpass);

router.get('/stats', authMiddleware, (req, res, next) => {
  console.log('Route: GET /stats');
  next();
}, wardenController.getStats);

console.log('Warden routes setup completed');

module.exports = router;