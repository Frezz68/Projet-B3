import { Router } from 'express';

const facturesRoute = Router();

facturesRoute.get('/', (req, res) => {
    res.send('Hello Express Router!');
});

facturesRoute.get('/example', (req, res) => {
    res.send('This is an example route');
});

export default facturesRoute;