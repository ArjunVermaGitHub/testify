const errorHandler = (err, req, res, next) => {
    // Customize the error message and status code
    const statusCode = err.status || 500; // Default to 500 if no status code is set
    const errorMessage = err.message || 'Internal Server Error';
  
    // Log the error (optional, for debugging)
    console.error(`[Error] ${statusCode} - ${errorMessage}`);
  
    // Send the custom error response
    res.status(statusCode).json({
      error: true,
      message: errorMessage,
    });
  }

  export default errorHandler