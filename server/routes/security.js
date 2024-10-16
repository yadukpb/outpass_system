const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController');

console.log('Initializing security routes...');

router.post('/scan', securityController.scanQRCode);

console.log('Security routes established.');

module.exports = router;