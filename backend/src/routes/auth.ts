const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';
import bcrypt from 'bcrypt';

const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');

router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        logger.info('[api/users]', users);
        res.json(users);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            logger.warring('Missing required fields');
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const existingUser = await prisma.user.findUnique({ where: { username } });
        if (existingUser) {
            logger.warring(`Username ${existingUser.username} already exists`);
            return res.status(400).json({ error: 'Username already exists' });
        }

        //TODO dodać walidację email
        //TODO dodać walidację hasła

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //TODO dodać email
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
            select: {
                id: true,
                username: true,
                createdAt: true,
            },
        });

        logger.info('[api/register]', user);
        res.json(user);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
