import React, { useState } from 'react'
import SearchForm from './components/SearchForm'
import Dashboard from './pages/Dashboard'
import './styles/App.css'

function App() {
  const [refreshDashboard, setRefreshDashboard] = useState(0)

  const handleNewSearch = () => {
    setRefreshDashboard(prev => prev + 1)
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Weather Dashboard</h1>
        <p>Search for weather data and view your search history</p>
      </header>

      <main className="app-main">
        <div className="search-section">
          <SearchForm onSearchComplete={handleNewSearch} />
        </div>

        <div className="dashboard-section">
          <Dashboard key={refreshDashboard} />
        </div>
      </main>
    </div>
  )
}

export default App