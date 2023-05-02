import { Router } from 'express';
import {checkToken} from "../../middleware/tokenMiddleware";
import * as UserControllers from './produits-controller';

const produitsRoute = Router();

produitsRoute.get('/',checkToken, UserControllers.getProduits);

produitsRoute.get('/:id',checkToken, UserControllers.getProduitById);

produitsRoute.put('/',checkToken, UserControllers.createProduit);

produitsRoute.delete('/:id',checkToken, UserControllers.deleteProduit);

produitsRoute.post('/:id',checkToken, UserControllers.updateProduit);

export default produitsRoute;