const express = require('express');
import { Request, Response } from 'express';
const router = express.Router();
import { prisma } from '../utils/prisma';

router.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

module.exports = router;
