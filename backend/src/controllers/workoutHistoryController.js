const { 
  fetchWorkoutHistory,
  fetchWorkoutHistoryDetail
} = require('../services/workoutHistoryService');

// Get workout history
const getWorkoutHistory = async (req, res) => {
  const userId = req.auth.userId;
  
  try {
    const { data, error } = await fetchWorkoutHistory(userId);
    
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching workout history:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get workout history detail
const getWorkoutHistoryDetail = async (req, res) => {
  const { id } = req.params;
  const userJwt = req.headers.authorization.substring(7)
  
  try {
    const { data, error } = await fetchWorkoutHistoryDetail(id, userJwt);
    
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    
    if (!data) {
      return res.status(404).json({ message: 'Workout history not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching workout history detail:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getWorkoutHistory,
  getWorkoutHistoryDetail
};