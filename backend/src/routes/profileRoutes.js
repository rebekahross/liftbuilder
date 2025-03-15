const express = require('express');
const { 
  getUserProfile, 
  updateUserProfile,
  getUserMetrics,
  updateUserMetrics
} = require('../controllers/profileController');
const router = express.Router();

// Get user profile
router.get('/', getUserProfile);

// Update user profile
router.put('/', updateUserProfile);

// Get user metrics
router.get('/metrics', getUserMetrics);

// Update user metrics
router.put('/metrics', updateUserMetrics);

module.exports = router;