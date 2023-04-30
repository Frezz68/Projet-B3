import { Router } from 'express';

const userRoute = Router();

userRoute.get('/', (req, res) => {
    res.send('Hello Express Router!');
});

userRoute.post('/login', (req, res) => {
    res.send('This is an example route');
});

export default userRoute;