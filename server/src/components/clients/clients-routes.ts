import { Router } from 'express';
import {checkToken} from "../../middleware/tokenMiddleware";
import * as ClientControllers from './clients-controller';

const clientsRoute = Router();
// routes pour les clients
clientsRoute.get('/', checkToken, ClientControllers.getClients);
clientsRoute.get('/:id', checkToken, ClientControllers.getClientById);
clientsRoute.post('/', checkToken, ClientControllers.createClient);
clientsRoute.delete('/:id', checkToken, ClientControllers.deleteClient);
clientsRoute.put('/:id', checkToken, ClientControllers.updateClient);

export default clientsRoute;