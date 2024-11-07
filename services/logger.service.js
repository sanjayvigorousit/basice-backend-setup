// logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

// Define custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

// Create the logger
const logger = createLogger({
    level: 'info', // Default log level
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }), // Capture error stack traces
        logFormat
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to this file
        new transports.File({ filename: 'logs/combined.log' }), // Log all levels to this file
    ],
});

// If not in production, log to console as well
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            logFormat
        ),
    }));
}

module.exports = logger;
