import React, { useState, useEffect } from 'react'
import WeatherCard from '../components/WeatherCard'
import { getWeatherHistory } from '../services/api'

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    fetchWeatherData()
  }, [currentPage])

  const fetchWeatherData = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await getWeatherHistory(currentPage, itemsPerPage)
      setWeatherData(response.data.data)
      setTotalPages(response.data.totalPages)
    } catch (error) {
      setError('Failed to load weather data')
      console.error('Error fetching weather data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading weather data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error">{error}</div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <h2>Weather Search History</h2>

      {weatherData.length === 0 ? (
        <div className="no-data">
          <p>No weather data found. Start by searching for a city!</p>
        </div>
      ) : (
        <>
          <div className="weather-grid">
            {weatherData.map((weather) => (
              <WeatherCard key={weather._id} weatherData={weather} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>

              <div className="page-info">
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Dashboard