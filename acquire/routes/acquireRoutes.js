'use strict';

const express = require('express');
const router = express.Router();
const acquireController = require('../controllers/acquireController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/health', acquireController.health);
router.post('/data', authMiddleware, acquireController.getData);

module.exports = router;