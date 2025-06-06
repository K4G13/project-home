const express = require('express');
const router = express.Router();
import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
const JWT_SECRET = process.env.JWT_SECRET || 'SECRET';
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            logger.warring('Missing required fields');
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const existingUser = await prisma.user.findUnique({ where: { username } });
        if (existingUser) {
            logger.warring(`Username "${existingUser.username}" already exists`);
            return res.status(400).json({ error: 'Username already exists' });
        }

        //TODO dodać walidację email
        //TODO dodać walidację hasła

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                email: 'test@example.com',
            },
            select: {
                id: true,
                username: true,
                created_at: true,
            },
        });

        logger.info('Registered', user);
        res.json(user);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            logger.warring('Missing required fields');
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            logger.warring(`User ${username} not found`);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            logger.warring(`Invalid password for user ${username}`);
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const expires_in = 60 * 1; // 5 min
        const new_token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
            expiresIn: expires_in,
        });

        logger.info(`User "${username}" logged in`);
        res.json({ message: 'Login successful', username, token: new_token, expires_in });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
