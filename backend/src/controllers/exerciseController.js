const { 
  fetchAllExercises, 
  fetchExerciseById,
  fetchExercisesByCategory,
  fetchUserExerciseSettings,
  updateExerciseSettings
} = require('../services/exerciseService');

// Get all exercises
const getAllExercises = async (req, res) => {
  try {
    const { data, error } = await fetchAllExercises();
    
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific exercise
const getExerciseById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const { data, error } = await fetchExerciseById(id);
    
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    if (!data) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching exercise by ID:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get exercises by category
const getExercisesByCategory = async (req, res) => {
  const { category } = req.params;
  
  try {
    const { data, error } = await fetchExercisesByCategory(category);
    
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching exercises by category:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get user exercise settings
const getUserExerciseSettings = async (req, res) => {
  const userId = req.auth.userId;
  
  try {
    const { data, error } = await fetchUserExerciseSettings(userId);
    
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user exercise settings:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update user exercise settings
const updateUserExerciseSettings = async (req, res) => {
  const { exerciseId } = req.params;
  const userId = req.auth.userId;
  const settingsData = req.body;
  
  try {
    const { data, error } = await updateExerciseSettings(userId, exerciseId, settingsData);
    
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error updating user exercise settings:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllExercises,
  getExerciseById,
  getExercisesByCategory,
  getUserExerciseSettings,
  updateUserExerciseSettings
};