const express = require('express');
const { 
  getWorkoutHistory,
  getWorkoutHistoryDetail
} = require('../controllers/workoutHistoryController');
const router = express.Router();

// Get workout history
router.get('/', getWorkoutHistory);

// Get workout history detail
router.get('/:id', getWorkoutHistoryDetail);

module.exports = router;