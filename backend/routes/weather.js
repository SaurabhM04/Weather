const express = require('express');
const axios = require('axios');
const Weather = require('../models/Weather');

const router = express.Router();

// OpenWeatherMap API configuration
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'your_api_key_here';
const OPENWEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

// Search weather and store in database
router.post('/search', async (req, res) => {
  try {
    const { city } = req.body;

    if (!city || city.trim().length === 0) {
      return res.status(400).json({ 
        message: 'City name is required' 
      });
    }

    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'your_api_key_here') {
      return res.status(500).json({ 
        message: 'OpenWeatherMap API key is not configured' 
      });
    }

    // Fetch weather data from OpenWeatherMap API
    const weatherResponse = await axios.get(OPENWEATHER_BASE_URL, {
      params: {
        q: city.trim(),
        appid: OPENWEATHER_API_KEY,
        units: 'metric'
      },
      timeout: 5000
    });

    const weatherData = weatherResponse.data;

    // Create weather record
    const weather = new Weather({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      feelsLike: weatherData.main.feels_like,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      windSpeed: weatherData.wind?.speed || 0
    });

    await weather.save();

    res.status(201).json({
      message: 'Weather data saved successfully',
      data: weather
    });

  } catch (error) {
    console.error('Weather search error:', error);

    if (error.response?.status === 404) {
      return res.status(404).json({ 
        message: 'City not found. Please check the city name and try again.' 
      });
    }

    if (error.response?.status === 401) {
      return res.status(500).json({ 
        message: 'Invalid API key configuration' 
      });
    }

    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({ 
        message: 'Request timeout. Please try again.' 
      });
    }

    if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
      return res.status(503).json({ 
        message: 'Unable to connect to weather service. Please try again later.' 
      });
    }

    res.status(500).json({ 
      message: 'Failed to fetch weather data. Please try again.' 
    });
  }
});

// Get weather history with pagination
router.get('/history', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({ 
        message: 'Invalid pagination parameters' 
      });
    }

    // Get total count for pagination
    const totalRecords = await Weather.countDocuments();
    const totalPages = Math.ceil(totalRecords / limit);

    // Fetch weather records
    const weatherHistory = await Weather.find({})
      .sort({ searchedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      data: weatherHistory,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      totalPages, // For frontend compatibility
      currentPage: page
    });

  } catch (error) {
    console.error('Weather history error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch weather history' 
    });
  }
});

// Get weather by ID
router.get('/:id', async (req, res) => {
  try {
    const weather = await Weather.findById(req.params.id);

    if (!weather) {
      return res.status(404).json({ 
        message: 'Weather record not found' 
      });
    }

    res.status(200).json({ data: weather });

  } catch (error) {
    console.error('Get weather error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid weather record ID' 
      });
    }

    res.status(500).json({ 
      message: 'Failed to fetch weather record' 
    });
  }
});

// Delete weather record
router.delete('/:id', async (req, res) => {
  try {
    const weather = await Weather.findByIdAndDelete(req.params.id);

    if (!weather) {
      return res.status(404).json({ 
        message: 'Weather record not found' 
      });
    }

    res.status(200).json({ 
      message: 'Weather record deleted successfully' 
    });

  } catch (error) {
    console.error('Delete weather error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid weather record ID' 
      });
    }

    res.status(500).json({ 
      message: 'Failed to delete weather record' 
    });
  }
});

module.exports = router;