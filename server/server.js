const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

console.log('Dependencies loaded');

const authRoutes = require('./routes/authRoutes');
const outpassRoutes = require('./routes/outpassRoutes');
const studentRoutes = require('./routes/student');
const wardenRoutes = require('./routes/warden');
const hodRoutes = require('./routes/hod');
const securityRoutes = require('./routes/security');
const coordinatorRoutes = require('./routes/coordinator');
const applicationRoutes = require('./routes/applications');



console.log('Route modules imported');

const app = express();
const PORT = process.env.PORT || 5001;

console.log('Server initialization started');
console.log(`PORT set to: ${PORT}`);

try {
  app.use(cors());
  console.log('CORS middleware applied successfully');
} catch (error) {
  console.error('Error applying CORS middleware:', error);
}

try {
  app.use(express.json());
  console.log('JSON parsing middleware applied successfully');
} catch (error) {
  console.error('Error applying JSON parsing middleware:', error);
}

console.log('Attempting database connection...');
connectDB().then(() => {
  console.log('Database connected successfully');
}).catch(error => {
  console.error('Database connection failed:', error);
});

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

console.log('Registering routes...');

try {
  app.use('/api/auth', authRoutes);
  app.use('/api/outpass', outpassRoutes);
  app.use('/api/student', studentRoutes);
  app.use('/api/warden', wardenRoutes);
  app.use('/api/hod', hodRoutes);
  app.use('/api/security', securityRoutes);
  app.use('/api/coordinator', coordinatorRoutes);
  app.use('/api/applications', applicationRoutes);



// Rental Car routes
app.get('/api/rental-cars', rentalCarController.getAllRentalCars);
app.get('/api/rental-cars/location/:locationId', rentalCarController.getRentalCarsByLocation);
app.post('/api/rental-cars', rentalCarController.createRentalCar);
  console.log('All routes registered successfully');
} catch (error) {
  console.error('Error registering routes:', error);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (error) => {
  console.error('Error starting server:', error);
});

console.log('Server setup complete');