import Winston from 'winston';

// Create a Winston logger instance
export const logger = Winston.createLogger({
    level: "info",
    format: Winston.format.combine(
        Winston.format.timestamp(),
        Winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} | ${message}`;
        })
    ),
    transports: [
        new Winston.transports.Console(),
        new Winston.transports.File({ filename: "logs/service.log" }),
    ],
});

// Middleware to log requests
export const logMiddleware = (req, res, next) => {
    const start = process.hrtime();

    res.on("finish", () => {
        const diff = process.hrtime(start);
        const timeTaken = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2); // Convert to ms
        const route = req.route ? req.route.path : "Unknown Route"; // Capture the route

        logger.info(`${res.statusCode} | ${req.method} ${req.originalUrl} | Route: ${route} | ${timeTaken}ms`);
    });

    next();
};
