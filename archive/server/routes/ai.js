const express = require('express');
const aiController = require('../controllers/aiController');

const router = express.Router();

// POST /api/ai/query - Process user query and generate AI response
router.post('/query', aiController.processQuery);

// POST /api/ai/recommendations - Generate car recommendations based on preferences or natural language
router.post('/recommendations', aiController.getRecommendations);

// POST /api/ai/faq - Generate personalized responses to FAQ
router.post('/faq', aiController.answerFAQ);

module.exports = router;