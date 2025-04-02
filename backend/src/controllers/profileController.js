const { fetchUserProfile, updateProfile, fetchUserMetrics, updateMetrics } = require("../services/profileService");

// Get user profile
const getUserProfile = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const { data, error } = await fetchUserProfile(userId);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (!data) {
      return res.status(404).json({ message: "User profile not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const userId = req.auth.userId;
  const profileData = req.body;

  try {
    const { data, error } = await updateProfile(userId, profileData);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get user metrics
const getUserMetrics = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const { data, error } = await fetchUserMetrics(userId);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching user metrics:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update user metrics
const updateUserMetrics = async (req, res) => {
  const userId = req.auth.userId;
  const metricsData = req.body;

  try {
    const { data, error } = await updateMetrics(userId, metricsData);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error updating user metrics:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserMetrics,
  updateUserMetrics,
};
