const {
  createLogger,
  format,
  transports
} = require('winston');
const {
  combine,
  timestamp,
  printf
} = format

const myFormat = printf(({
    timestamp,
    level,
    label,
    message
  }) =>
  `[${timestamp}] ${(level).toUpperCase()}: ${(label).toUpperCase()} - ${message}`);

const logger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    myFormat
  ),
  transports: [
    new transports.File({
      filename: './log/surl.log'
    }),
    new transports.Console()
  ]
});

module.exports = logger

// Logger Level
// logger.log('silly', "127.0.0.1 - there's no place like home");
// logger.log('debug', "127.0.0.1 - there's no place like home");
// logger.log('verbose', "127.0.0.1 - there's no place like home");
// logger.log('info', "127.0.0.1 - there's no place like home");
// logger.log('warn', "127.0.0.1 - there's no place like home");
// logger.log('error', "127.0.0.1 - there's no place like home");