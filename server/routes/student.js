const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

console.log('Student router initialized');

router.post('/outpass', authMiddleware, (req, res, next) => {
  console.log('POST /outpass route hit');
  studentController.createOutpass(req, res, next);
});

router.get('/outpass/history', authMiddleware, (req, res, next) => {
  console.log('GET /outpass/history route hit');
  studentController.getOutpassHistory(req, res, next);
});

router.get('/outpass/latest', authMiddleware, (req, res, next) => {
  console.log('GET /outpass/latest route hit');
  studentController.getLatestOutpass(req, res, next);
});

router.get('/outpass/download/:id', authMiddleware, (req, res, next) => {
  console.log(`GET /outpass/download/${req.params.id} route hit`);
  studentController.downloadOutpassPDF(req, res, next);
});

console.log('Student router setup complete');

module.exports = router;