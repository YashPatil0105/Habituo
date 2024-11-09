import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

// Correctly define __dirname for ES Modules using import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Log event function
const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        // Ensure correct log directory path
        const logDir = path.join(__dirname, '..', 'logs');  // Path for log directory

        // Check if the directory exists; if not, create it
        if (!fs.existsSync(logDir)) {
            await fsPromises.mkdir(logDir, { recursive: true }); // Ensures all parent dirs are created
        }

        // Append the log item to the log file
        await fsPromises.appendFile(path.join(logDir, logName), logItem);
    } catch (err) {
        console.error('Error writing log:', err);
    }
};

// Middleware to log requests
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
};

export { logger, logEvents };
