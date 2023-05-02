import { Router } from 'express';
import {checkToken} from "../../middleware/tokenMiddleware";
import * as ClientControllers from './clients-controller';

const clientsRoute = Router();

clientsRoute.get('/', checkToken, ClientControllers.getClients);
clientsRoute.get('/:id', checkToken, ClientControllers.getClientById);
clientsRoute.put('/', checkToken, ClientControllers.createClient);
clientsRoute.delete('/:id', checkToken, ClientControllers.deleteClient);
clientsRoute.post('/:id', checkToken, ClientControllers.updateClient);

export default clientsRoute;