import React from 'react'

const WeatherCard = ({ weatherData }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h3>{weatherData.city}</h3>
        <span className="search-date">{formatDate(weatherData.searchedAt)}</span>
      </div>

      <div className="weather-content">
        <div className="temperature">
          <span className="temp-value">{Math.round(weatherData.temperature)}°C</span>
          <span className="feels-like">Feels like {Math.round(weatherData.feelsLike)}°C</span>
        </div>

        <div className="weather-info">
          <div className="weather-main">
            <strong>{weatherData.description}</strong>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="label">Humidity:</span>
              <span className="value">{weatherData.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="label">Pressure:</span>
              <span className="value">{weatherData.pressure} hPa</span>
            </div>
            <div className="detail-item">
              <span className="label">Wind Speed:</span>
              <span className="value">{weatherData.windSpeed} m/s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard