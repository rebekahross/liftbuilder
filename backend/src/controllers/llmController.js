const { generateLLMResponse } = require('../services/llmService');

// Process prompt and return LLM response
const processPrompt = async (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }
  
  try {
    const { data, error } = await generateLLMResponse(prompt);
    
    if (error) {
      return res.status(400).json({ message: error });
    }
    
    return res.status(200).json({ response: data });
  } catch (error) {
    console.error('Error processing prompt:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  processPrompt
};