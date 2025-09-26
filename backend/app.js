const express = require('express');
require('dotenv').config();
const cors = require('cors');
require('colors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require('@prisma/client'); // ✅ import PrismaClient
const { errorHanlder } = require('./middleware/errorHandler');


const prisma = new PrismaClient(); // ✅ instantiate Prisma

const app = express();

// Middleware
app.use(cookieParser());
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'middleware', 'uploads')));

// Routes
app.use('/api/', require('./routes/productRoutes'));
app.use('/api/authors', require('./routes/authorRoutes'));
app.use('/api/publishers', require('./routes/publisherRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/subcategories', require('./routes/subcategoryRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/paystack', require('./routes/paystackPaymentRoutes'));
app.use('/api/lelann', require('./routes/mpesaPaymentRoutes'));
app.use('/api/filters', require('./routes/filter'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use(errorHanlder);

// Show incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 3000;

// Connect to PostgreSQL via Prisma before starting server
async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ PostgreSQL database connected'.green.bold);

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`.cyan);
    });
  } catch (err) {
    console.error('❌ Failed to connect to the database'.red.bold);
    console.error(err);
    process.exit(1); // Stop app if DB fails to connect
  }
}

startServer();
