const express = require('express');
const { login, signUp } = require('../controllers/authController');
const router = express.Router();

// Login Route
router.post('/login', login);

// SignUp Route
router.post('/signUp', signUp);

module.exports = router;
