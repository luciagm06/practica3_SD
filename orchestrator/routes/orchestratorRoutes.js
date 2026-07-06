'use strict';

const express = require('express');
const router = express.Router();
const orchestratorController = require('../controllers/orchestratorController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/health', orchestratorController.health);
router.post('/login', authController.login);
router.post('/run', authMiddleware, orchestratorController.run);

module.exports = router;