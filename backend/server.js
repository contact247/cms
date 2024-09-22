// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/students');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const facultyRoutes = require('./routes/faculty');
const departmentRoutes = require('./routes/departments');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
  'https://main--fanciful-heliotrope-c4fcf9.netlify.app',
  'http://localhost:3000',
  // Add other origins if necessary
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Explicitly specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true, // Allow cookies if needed
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'cms'
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Basic Route
app.get('/', (req, res) => {
  res.send('College Management System API');
});

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/departments', departmentRoutes);
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
