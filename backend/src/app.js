const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const workoutHistoryRoutes = require('./routes/workoutHistoryRoutes');
const profileRoutes = require('./routes/profileRoutes');
const llmRoutes = require('./routes/llmRoutes');
const authenticateUser = require('./middleware/auth');

dotenv.config({ path: '../../.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', authenticateUser, workoutRoutes);
app.use('/api/exercises', authenticateUser, exerciseRoutes);
app.use('/api/workout-history', authenticateUser, workoutHistoryRoutes);
app.use('/api/profile', authenticateUser, profileRoutes);
app.use('/api/llm', authenticateUser, llmRoutes);

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});

module.exports = app;