const { 
  fetchWorkouts, 
  fetchWorkoutById, 
  insertWorkout, 
  modifyWorkout, 
  removeWorkout,
  markWorkoutComplete,
  fetchActiveWorkout
} = require('../services/workoutService');

// Get all workouts for a user
const getWorkouts = async (req, res) => {
  const userJwt = req.headers.authorization.substring(7)
  
  try {
    const { data, error } = await fetchWorkouts(userJwt);
    
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get a user's active workout
const getActiveWorkout = async (req, res) => {
  const userJwt = req.headers.authorization.substring(7)
  
  try {
    const { data, error } = await fetchActiveWorkout(userJwt);
    
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    if (!data) {
      return res.status(404).json({ message: 'No active workout found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching active workout:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific workout
const getWorkoutById = async (req, res) => {
  const { id } = req.params;
  const userJwt = req.headers.authorization.substring(7)
  
  try {
    const { data, error } = await fetchWorkoutById(id, userJwt);
    
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    if (!data) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching workout by ID:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Create a new workout
const createWorkout = async (req, res) => {
  const workoutData = req.body;
  const userJwt = req.headers.authorization.substring(7)
  
  try {
    const { data, error } = await insertWorkout(workoutData, userJwt);
    
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    return res.status(201).json(data);
  } catch (error) {
    console.error('Error creating workout:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const userJwt = req.headers.authorization.substring(7)
  
  try {
    const { data, error } = await modifyWorkout(id, updates, userJwt);
    
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    if (!data) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error updating workout:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  const userJwt = req.headers.authorization.substring(7)
  
  try {
    const { success, error } = await removeWorkout(id, userJwt);
    
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    if (!success) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    return res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Error deleting workout:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Mark a workout as complete
const completeWorkout = async (req, res) => {
  const { id } = req.params;
  const completionData = req.body;
  const userJwt = req.headers.authorization.substring(7)
  
  try {
    const { data, error } = await markWorkoutComplete(id, completionData, userJwt);
    
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    if (!data) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error completing workout:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  completeWorkout,
  getActiveWorkout
};