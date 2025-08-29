import React, { useState } from 'react'
import { searchWeather } from '../services/api'

const SearchForm = ({ onSearchComplete }) => {
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!keyword.trim()) {
      setMessage('Please enter a city name')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await searchWeather(keyword)
      setMessage(`Weather data for ${keyword} saved successfully!`)
      setKeyword('')
      onSearchComplete()
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="search-form">
      <h2>Search Weather</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter city name (e.g., London, New York)"
            className="search-input"
            disabled={loading}
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  )
}

export default SearchForm