const { OpenAI } = require('openai');
const Car = require('../models/Car');

// Configure OpenAI client with direct API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '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'
});

// Process user query and generate AI response
exports.processQuery = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    // Prepare conversation history for context
    const formattedConversationHistory = conversationHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Add system message with context about Gargash and available cars
    const cars = await Car.find().select('brand model year price bodyType fuelType');
    
    // Create a system message with context about Gargash Group
    const systemMessage = {
      role: 'system',
      content: `You are an AI-powered car sales assistant for Gargash Group, a leading automotive distributor in the UAE. 
      You help customers find the perfect vehicle that matches their needs and preferences.
      You can provide information about our car models, help schedule test drives, and answer questions about financing options.
      Here are some of the available car models: ${JSON.stringify(cars.slice(0, 10))}
      Be professional, helpful, and guide customers through their car buying journey.`
    };

    // Add the user's current message
    const userMessage = {
      role: 'user',
      content: message,
    };

    // Combine all messages for the OpenAI API
    const messages = [systemMessage, ...formattedConversationHistory, userMessage];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    // Return the AI response
    res.status(200).json({
      success: true,
      data: {
        reply,
        conversationHistory: [
          ...conversationHistory,
          userMessage,
          { role: 'assistant', content: reply },
        ],
      },
    });
  } catch (err) {
    console.error('AI processing error:', err);
    res.status(500).json({ success: false, error: 'AI processing failed' });
  }
};

// Generate car recommendations based on user preferences
exports.getRecommendations = async (req, res) => {
  try {
    const { preferences, userInput } = req.body;

    if (!preferences && !userInput) {
      return res.status(400).json({ success: false, error: 'Preferences or user input is required' });
    }

    let filter = {};

    // If explicit preferences are provided, use them
    if (preferences) {
      if (preferences.brands && preferences.brands.length > 0) {
        filter.brand = { $in: preferences.brands };
      }
      
      if (preferences.bodyTypes && preferences.bodyTypes.length > 0) {
        filter.bodyType = { $in: preferences.bodyTypes };
      }
      
      if (preferences.budget) {
        filter.price = { $lte: Number(preferences.budget) };
      }
      
      if (preferences.fuelTypes && preferences.fuelTypes.length > 0) {
        filter.fuelType = { $in: preferences.fuelTypes };
      }
    } 
    // If user provided free-text input, use AI to extract preferences
    else if (userInput) {
      // Use OpenAI to extract preferences from natural language
      const extractionPrompt = `
        Extract car preferences from the following user input into a structured format.
        User Input: "${userInput}"
        
        Please provide the extracted information in JSON format with these fields (if mentioned):
        - brands: array of car brands mentioned
        - bodyTypes: array of body types (SUV, sedan, etc.)
        - budget: maximum price the user is willing to pay
        - fuelTypes: array of fuel types (gasoline, electric, hybrid)
        - otherFeatures: array of other important features mentioned
      `;

      const extraction = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: extractionPrompt
          }
        ],
        max_tokens: 500,
        temperature: 0.3,
      });

      let extractedPreferences;
      try {
        extractedPreferences = JSON.parse(extraction.choices[0].message.content);
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        extractedPreferences = {};
      }

      // Build filter from AI-extracted preferences
      if (extractedPreferences.brands && extractedPreferences.brands.length > 0) {
        filter.brand = { $in: extractedPreferences.brands.map(brand => new RegExp(brand, 'i')) };
      }
      
      if (extractedPreferences.bodyTypes && extractedPreferences.bodyTypes.length > 0) {
        filter.bodyType = { $in: extractedPreferences.bodyTypes.map(type => new RegExp(type, 'i')) };
      }
      
      if (extractedPreferences.budget) {
        filter.price = { $lte: Number(extractedPreferences.budget) };
      }
      
      if (extractedPreferences.fuelTypes && extractedPreferences.fuelTypes.length > 0) {
        filter.fuelType = { $in: extractedPreferences.fuelTypes.map(type => new RegExp(type, 'i')) };
      }
    }

    // Find matching cars
    const recommendedCars = await Car.find(filter).limit(6);
    
    // If no exact matches, get general recommendations
    if (recommendedCars.length === 0) {
      const generalRecommendations = await Car.find().sort({ popularity: -1 }).limit(5);
      return res.status(200).json({ 
        success: true, 
        count: generalRecommendations.length, 
        data: generalRecommendations,
        message: "We couldn't find exact matches for your preferences, but here are some popular options."
      });
    }
    
    res.status(200).json({ 
      success: true, 
      count: recommendedCars.length, 
      data: recommendedCars 
    });
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Generate personalized responses to FAQ
exports.answerFAQ = async (req, res) => {
  try {
    const { question, userContext } = req.body;

    if (!question) {
      return res.status(400).json({ success: false, error: 'Question is required' });
    }

    // Prepare context-aware prompt
    let prompt = `
      As an AI assistant for Gargash Group automotive dealership, answer the following customer question:
      "${question}"
      
      Base your answer on the following facts:
      - Gargash Group is a premier automotive dealership in the UAE
      - We offer various financing options including 0% interest for qualified buyers
      - Test drives can be scheduled online or by calling our service center
      - Warranty ranges from 3-7 years depending on the vehicle make and model
      - Servicing is available at all our service centers across the UAE
      - We have locations in Dubai, Abu Dhabi, Sharjah, and Ras Al Khaimah
    `;

    // Add user context if available
    if (userContext) {
      prompt += `\nCustomer context: ${JSON.stringify(userContext)}`;
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 350,
      temperature: 0.7,
    });

    const answer = completion.choices[0].message.content;

    // Return the AI response
    res.status(200).json({
      success: true,
      data: { answer }
    });
  } catch (error) {
    console.error('Error answering FAQ:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
