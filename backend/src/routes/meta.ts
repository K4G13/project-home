const express = require('express');
const router = express.Router();
import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';
router.get('/', async (req: Request, res: Response) => {
    res.json({ message: 'HOME SERVER (v7.0) SAYS HELLO 👋' });
});

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

module.exports = router;
