// logger.js
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

// Define custom log format
const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: "info", // Log levels: error, warn, info, http, verbose, debug, silly
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    colorize(), // Add color for console
    customFormat
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: "logs/app.log", level: "info" }), // Log to file
  ],
  exceptionHandlers: [
    new transports.File({ filename: "logs/exceptions.log" }), // Log uncaught exceptions
  ],
  exitOnError: false, // Prevent exit on handled exceptions
});

module.exports = logger;
