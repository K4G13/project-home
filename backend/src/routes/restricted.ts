const express = require('express');
const router = express.Router();
import { Request, Response } from 'express';
import { authenticate_token, AuthRequest } from '../middleware/authenticator';
import { logger } from '../utils/logger';

router.get('/restricted', authenticate_token, async (req: AuthRequest, res: Response) => {
    res.json({ message: 'Access granted to restricted route', user: req.user });
    logger.error('Access granted to restricted route', req.user);
});

module.exports = router;
