const express = require('express');
const { processPrompt } = require('../controllers/llmController');
const router = express.Router();

// Single endpoint to process prompts
router.post('/prompt', processPrompt);

module.exports = router;