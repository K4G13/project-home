import 'dotenv/config';
import express, { Request, Response } from 'express';
import { logger } from './utils/logger';

const infoRouter = require('./routes/info');
const authRouter = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//!  ROUTES
app.use('/api', infoRouter);
app.use('/api', authRouter);

//! SERVER START
const PORT: number = parseInt(process.env.PORT || '3000');
const ASCIlogo = require('./utils/ascii-logo');
app.listen(PORT, () => {
    logger.color('red', ASCIlogo);
    logger.log(`🔥 running on port: ${PORT}`);
    logger.log(`🔸 http://localhost:${PORT}\n`);
});
