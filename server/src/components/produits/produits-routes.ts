import { Router } from 'express';

const produitsRoute = Router();

produitsRoute.get('/', (req, res) => {
    res.send('Hello Express Router!');
});

produitsRoute.get('/:id', (req, res) => {
    res.send('This is an example route');
});

produitsRoute.put('/', (req, res) => {
    
});

export default produitsRoute;