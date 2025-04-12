import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Send prompt to LLM API
export const sendPrompt = async (prompt) => {
  try {
    const response = await axios.post(
      `${API_URL}/llm/prompt`, 
      { prompt }, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error processing prompt';
  }
};