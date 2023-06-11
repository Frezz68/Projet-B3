import jwt from 'jsonwebtoken';

// Durée de validité du token
const expiresIn = '3h';

export function generateToken(payload: object): string {
    // Génére un JWT en signant le payload avec la clé secrète
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });

    // Retourne le token
    return `${token}`;
}


