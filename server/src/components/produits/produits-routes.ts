import { Router } from 'express';

const produitsRoute = Router();

produitsRoute.get('/', (req, res) => {
    res.send('Hello Express Router!');
});

produitsRoute.get('/example', (req, res) => {
    res.send('This is an example route');
});

export default produitsRoute;