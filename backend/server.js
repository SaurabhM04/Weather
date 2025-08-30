// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const weatherRoutes = require('./routes/weather');
// const errorHandler = require('./middleware/errorHandler');

// const app = express();
// const PORT = process.env.PORT || 5000;

// console.log(process.env.FRONTEND_URL);

// // Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.get("/", (req, res) => {
//   res.send("Backend is running ✅");
// });


// app.use('/api/weather', weatherRoutes);

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ message: 'Server is running!' });
// });

// // Error handling middleware
// app.use(errorHandler);

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Database connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/weatherapp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('Connected to MongoDB');
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// })
// .catch((error) => {
//   console.error('Database connection error:', error);
//   process.exit(1);
// });

// // Graceful shutdown
// process.on('SIGINT', () => {
//   console.log('\nReceived SIGINT. Graceful shutdown...');
//   mongoose.connection.close(() => {
//     console.log('Database connection closed.');
//     process.exit(0);
//   });
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const weatherRoutes = require("./routes/weather");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

console.log("Frontend URL:", process.env.FRONTEND_URL);

// CORS Configuration - FIXED
const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://weather-smva.vercel.app", // Your frontend URL
  "https://weather-lwgx.vercel.app", // Your backend URL (if needed)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Add preflight OPTIONS handling
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.use("/api/weather", weatherRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Server is running!",
    cors: "Configured for multiple origins",
    allowedOrigins: allowedOrigins,
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/weatherapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nReceived SIGINT. Graceful shutdown...");
  mongoose.connection.close(() => {
    console.log("Database connection closed.");
    process.exit(0);
  });
});