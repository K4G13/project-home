const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';

router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        logger.info('[/api/users]', users);
        res.json(users);
    } catch (error) {
        logger.error('[/api/users]', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.create({
            data: {
                username,
                password,
            },
        });
        logger.info('[/api/register]', user);
        res.json(user);
    } catch (error) {
        logger.error('[/api/register]', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
