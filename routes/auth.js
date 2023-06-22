const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.authenticateWithTwitter);

router.get('/callback', authController.twitterCallback, authController.loginSuccess);

module.exports = router;