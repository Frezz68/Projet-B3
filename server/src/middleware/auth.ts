import jwt from 'jsonwebtoken';

// Durée de validité du token
const expiresIn = '3h';

export function generateToken(payload: object): string {
    console.log(process.env.SECRET_KEY);
    // Générer un JWT en signant le payload avec la clé secrète
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });

    // Retourner le token
    return `${token}`;
}


