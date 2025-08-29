import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Request interceptor for error handling
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. Please try again.'
    } else if (!error.response) {
      error.message = 'Network error. Please check your connection.'
    }
    return Promise.reject(error)
  }
)

export const searchWeather = async (city) => {
  try {
    const response = await api.post('/weather/search', { city })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getWeatherHistory = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/weather/history?page=${page}&limit=${limit}`)
    return response
  } catch (error) {
    throw error
  }
}

export default api