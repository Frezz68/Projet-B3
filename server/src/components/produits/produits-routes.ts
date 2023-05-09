import { Router } from 'express';
import {checkToken} from "../../middleware/tokenMiddleware";
import * as ProduitsControllers from './produits-controller';

const produitsRoute = Router();

produitsRoute.get('/',checkToken, ProduitsControllers.getProduits);

produitsRoute.get('/:id',checkToken, ProduitsControllers.getProduitById);

produitsRoute.put('/',checkToken, ProduitsControllers.createProduit);

produitsRoute.delete('/:id',checkToken, ProduitsControllers.deleteProduit);

produitsRoute.post('/:id',checkToken, ProduitsControllers.updateProduit);

export default produitsRoute;