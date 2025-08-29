# Weather Dashboard Application

A full-stack web application that allows users to search for weather data using the OpenWeatherMap API, store the results in MongoDB, and view the search history on a dashboard.

## Features

- 🌤️ **Weather Search**: Enter a city name to fetch current weather data
- 💾 **Data Storage**: All search results are stored in MongoDB
- 📊 **Dashboard**: View search history with pagination
- 🎨 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Real-time Updates**: Dashboard refreshes after new searches
- 🛡️ **Error Handling**: Comprehensive error handling for API and network issues
- 📱 **Modern UI**: Clean, modern interface with smooth animations

## Tech Stack

### Frontend
- **React** (with JSX)
- **Vite** (build tool and dev server)
- **Axios** (HTTP client)
- **CSS3** (custom styling with Grid and Flexbox)

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **OpenWeatherMap API**
- **CORS** enabled for cross-origin requests

## Project Structure

```
weather-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchForm.jsx
│   │   │   └── WeatherCard.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   └── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── backend/
    ├── models/
    │   └── Weather.js
    ├── routes/
    │   └── weather.js
    ├── middleware/
    │   └── errorHandler.js
    ├── config/
    │   └── database.js
    ├── server.js
    ├── .env
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- OpenWeatherMap API key (free at https://openweathermap.org/api)

### 1. Extract and Navigate
```bash
# Extract the zip file and navigate to the project
cd weather-app
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file and add your OpenWeatherMap API key
OPENWEATHER_API_KEY=your_actual_api_key_here

# Start the backend server
npm run dev
```

### 3. Frontend Setup (in a new terminal)
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Database Setup
Make sure MongoDB is running on your system:

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas:**
Update the MONGODB_URI in backend/.env with your Atlas connection string.

## Usage

1. **Start the Application:**
   - Backend: http://localhost:5000
   - Frontend: http://localhost:3000

2. **Search for Weather:**
   - Enter a city name in the search form
   - Click "Search" to fetch and store weather data

3. **View Dashboard:**
   - Weather search history appears below the search form
   - Use pagination to navigate through results
   - Each card shows detailed weather information

## API Endpoints

### Weather Routes
- `POST /api/weather/search` - Search and store weather data
- `GET /api/weather/history?page=1&limit=10` - Get paginated weather history
- `GET /api/weather/:id` - Get specific weather record
- `DELETE /api/weather/:id` - Delete weather record

### Health Check
- `GET /api/health` - Server health status

## API Features Implemented

### ✅ Core Requirements
- [x] Form to enter keywords (city names)
- [x] Fetch data from public API (OpenWeatherMap)
- [x] Store results in MongoDB database
- [x] Display results on dashboard with styling

### ✅ Bonus Features
- [x] Clean, modular code structure
- [x] React with Vite on frontend
- [x] Comprehensive API error handling
- [x] Pagination for dashboard results

## Error Handling

The application includes robust error handling for:
- Invalid city names
- API timeout and network issues
- Invalid API keys
- Database connection problems
- Validation errors
- Rate limiting

## Environment Variables

```env
# Backend (.env)
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/weatherapp
OPENWEATHER_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:3000
```

## Development Commands

### Backend
```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Troubleshooting

### Common Issues

1. **"API key not configured" error:**
   - Make sure you've added your OpenWeatherMap API key to backend/.env

2. **"City not found" error:**
   - Check the spelling of the city name
   - Try using the full city name or add country code (e.g., "London,UK")

3. **Database connection issues:**
   - Ensure MongoDB is running locally
   - Check the MONGODB_URI in your .env file

4. **Frontend not connecting to backend:**
   - Verify both servers are running
   - Check that backend is running on port 5000
   - Ensure CORS is properly configured

### Getting API Key

1. Visit https://openweathermap.org/api
2. Sign up for a free account
3. Navigate to API Keys section
4. Copy your API key
5. Add it to backend/.env file

## Screenshots

The application features:
- Modern, responsive design
- Real-time weather data
- Interactive dashboard with pagination
- Smooth animations and transitions
- Error states and loading indicators

---

**Built with ❤️ for learning full-stack development**