import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { logger } from './utils/logger';

const meta_router = require('./routes/meta');
const register_login_router = require('./routes/register_login.ts');
const restricted_router = require('./routes/restricted');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: 'http://localhost:5173', //TODO change to production url
        credentials: true,
    })
);

//! ROUTES
app.use('/api', meta_router);
app.use('/api', register_login_router);
app.use('/api', restricted_router);

//! SERVER START
const ASCII_LOGO = require('./utils/ascii-logo');
const VERSION = process.env.VERSION || '7.0';
const PORT: number = parseInt(process.env.PORT || '3000');
app.listen(PORT, () => {
    logger.color('yellow', ASCII_LOGO);
    logger.color('yellow', `\t\t\tVERSION ${VERSION}\n`);
    logger.color('yellow', `\t\t🔥 running on port: ${PORT}`);
    logger.color('yellow', `\t\t🔸 http://localhost:${PORT}\n`);
});
