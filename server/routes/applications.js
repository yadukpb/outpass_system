const express = require('express');
const {
  getAllApplications,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
} = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

console.log('Initializing applications routes...');

// Get all applications
router.get('/', authMiddleware, (req, res, next) => {
  console.log('GET /api/applications - Request received');
  getAllApplications(req, res, next);
});

// Create a new application
router.post('/', authMiddleware, (req, res, next) => {
  console.log('POST /api/applications - Request received:', req.body);
  createApplication(req, res, next);
});

// Update an application status
router.put('/:id', authMiddleware, (req, res, next) => {
  console.log('PUT /api/applications/:id - Request received for ID:', req.params.id);
  updateApplicationStatus(req, res, next);
});

// Delete an application
router.delete('/:id', authMiddleware, (req, res, next) => {
  console.log('DELETE /api/applications/:id - Request received for ID:', req.params.id);
  deleteApplication(req, res, next);
});

console.log('Applications routes established.');

module.exports = router;