import { Router } from 'express';

const clientsRoute = Router();

clientsRoute.get('/', (req, res) => {
    res.send('Hello Express Router!');
});

clientsRoute.get('/example', (req, res) => {
    res.send('This is an example route');
});

export default clientsRoute;