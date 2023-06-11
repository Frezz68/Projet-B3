import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

// fonction qui permet de vérifier le token
function verifyToken(token: string): Promise<jwt.JwtPayload> {
    //retourne une promesse qui contient le token décodé
    return new Promise((resolve, reject) => {
        // vérifie le token avec la clé secrète
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded as jwt.JwtPayload);
            }
        });
    });
}
// fonction qui permet de créer un token
export function checkToken(req: Request, res: Response, next: NextFunction) {
    // récupère le token dans le header de la requête
    const authHeader = req.headers.authorization;
    // si le token n'est pas présent dans le header de la requête
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }
    // sépare le token du mot Bearer
    const [bearer, token] = authHeader.split(' ');
    // si le token n'est pas au format Bearer
    if (bearer !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid token format' });
    }
    // vérifie le token
    verifyToken(token)
        .then((decoded) => {
            // Attache les données décodées à l'objet req
            (req as jwt.JwtPayload).decoded = decoded;
            next();
        })
        .catch((err) => {
            res.status(401).json({ error: 'Invalid token' });
        });
}