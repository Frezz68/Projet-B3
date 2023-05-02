import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

function verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}
export function checkToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid token format' });
    }

    verifyToken(token)
        .then((decoded) => {
            // Attachez les données décodées à l'objet req pour utilisation ultérieure
            (req as any).decoded = decoded;
            next();
        })
        .catch((err) => {
            res.status(401).json({ error: 'Invalid token' });
        });
}