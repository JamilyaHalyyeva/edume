const loggerMiddleware = (req, res, next) => {
  // Log incoming request
  console.log(
    `[${new Date().toLocaleString()}] Incoming Request: ${req.method} ${req.url}`,
  );

  // Log request body if present
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('LoggerMiddeleWare->Request Body:', req.body);
  }

  // Capture the start time of the request
  const start = Date.now();

  // Capture the original end function to log response information
  const originalEnd = res.end;

  // Override the end function to log response information
  res.end = function (...args) {
    // Log outgoing response
    console.log(
      `[${new Date().toLocaleString()}] Outgoing Response: ${res.statusCode} - ${Date.now() - start}ms`,
    );

    // Call the original end function
    originalEnd.apply(res, args);
  };

  // Continue with the next middleware or route handler
  next();
};

export default loggerMiddleware;
