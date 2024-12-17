const errorHanlder = (err, req, res, next) => {
    console.log(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({ 
        status: 'error',
        statusCode,
        message,
     });

    next();
};

// Additional error handling middleware
function mpesaErrorHandler(err, req, res, next) {
    console.error('M-Pesa Payment Error:', {
      errorMessage: err.message,
      timestamp: new Date().toISOString()
    });
  
    res.status(500).json({
      error: 'Payment processing failed',
      message: err.message
    });

    next();
  }

module.exports = { errorHanlder, mpesaErrorHandler };