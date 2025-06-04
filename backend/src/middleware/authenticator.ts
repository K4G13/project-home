import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'SECRET';

export interface AuthRequest extends Request {
    user?: {
        user_id: number;
        username: string;
    };
}

export const authenticate_token = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        logger.warring('Access token missing');
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            //TODO przekierowanie do logowania
            logger.warring('Invalid or expired token');
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        req.user = decoded as { user_id: number; username: string };
        next();
    });
};
