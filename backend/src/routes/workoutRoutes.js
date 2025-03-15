const express = require('express');
const { 
  getWorkouts, 
  getWorkoutById, 
  createWorkout, 
  updateWorkout, 
  deleteWorkout, 
  completeWorkout,
  getActiveWorkout
} = require('../controllers/workoutController');
const router = express.Router();

// Get all workouts for a user
router.get('/', getWorkouts);

// Get the user's active workout (if any)
router.get('/active', getActiveWorkout);

// Get a specific workout
router.get('/:id', getWorkoutById);

// Create a new workout
router.post('/', createWorkout);

// Update a workout
router.put('/:id', updateWorkout);

// Delete a workout
router.delete('/:id', deleteWorkout);

// Mark a workout as complete
router.post('/:id/complete', completeWorkout);

module.exports = router;