const express = require('express');
const { 
  getAllExercises, 
  getExerciseById, 
  getExercisesByCategory,
  getUserExerciseSettings,
  updateUserExerciseSettings
} = require('../controllers/exerciseController');
const router = express.Router();

// Get all exercises
router.get('/', getAllExercises);

// Get exercises by category
router.get('/category/:category', getExercisesByCategory);

// Get user exercise settings
router.get('/settings', getUserExerciseSettings);

// Update user exercise settings
router.put('/settings/:exerciseId', updateUserExerciseSettings);

// Get a specific exercise
router.get('/:id', getExerciseById);

module.exports = router;