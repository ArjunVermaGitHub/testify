const logger = (req, res, next) => {
    // Log information about the incoming request
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
        console.log('Request Body:', req.body);
    }
    
    // Pass control to the next middleware or route handler
    next();
};

export default logger