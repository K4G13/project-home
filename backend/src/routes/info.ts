const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();
import { prisma } from '../utils/prisma';

router.get('/', async (req: Request, res: Response) => {
    res.json({ message: 'HOME SERVER (v7.0) SAYS HELLO 👋' });
});

module.exports = router;
