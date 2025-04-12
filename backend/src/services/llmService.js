const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * Simple service to send prompt to LLM and get response
 * @param {string} prompt - User prompt
 * @returns {Object} LLM response
 */
const generateLLMResponse = async (prompt) => {
  try {
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: 'google/gemini-2.5-pro-exp-03-25:free',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://liftbuilder.app',
          'X-Title': 'LiftBuilder App',
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      data: response.data.choices[0].message.content,
      error: null
    };
  } catch (error) {
    console.error('Error calling LLM API:', error);
    return {
      data: null,
      error: error.response?.data?.error || error.message
    };
  }
};

module.exports = {
  generateLLMResponse
};