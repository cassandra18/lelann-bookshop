const express = require('express');
require('dotenv').config();
const cors = require('cors');
require('colors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const { mpesaErrorHandler, errorHanlder } = require('./middleware/errorHandler');
const authorizeRole = require('./middleware/authorizeRole');
const authenticateAdmin = require('./middleware/authenticateAdmin')


// Middleware for parsing JSON bodies
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Serve static files from the 'middleware/uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'middleware', 'uploads')));

//mongoose
function connectDatabase() {
    mongoose
      .connect(process.env.MONGO_URI)
      .then((result) => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }
// connectDatabase();

// Routes
//app.use('/api/auth', require('./routes/auth'));
app.use('/api/', require('./routes/productRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/author', require('./routes/authorRoutes'));
app.use('/api/publisher', require('./routes/publisherRoutes'));
app.use('/api/category', require('./routes/categoryRoutes'));
app.use('/api/subcategory', require('./routes/subcategoryRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/paystack', require('./routes/paystackPaymentRoutes'));
app.use('/api/mpesa', require('./routes/mpesaPaymentRoutes'));
app.post('/api/admin/elevate', authenticateAdmin, authorizeRole, elevateToAdmin);
  
app.use(mpesaErrorHandler, errorHanlder);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.cyan);
});


