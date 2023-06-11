import { Router } from 'express';
import {checkToken} from "../../middleware/tokenMiddleware";
import * as ProduitsControllers from './produits-controller';

const produitsRoute = Router();

// initialisation des routes pour les produits avec leurs méthodes et middlewares
produitsRoute.get('/',checkToken, ProduitsControllers.getProduits);

produitsRoute.get('/:id',checkToken, ProduitsControllers.getProduitById);

produitsRoute.post('/',checkToken, ProduitsControllers.createProduit);

produitsRoute.delete('/:id',checkToken, ProduitsControllers.deleteProduit);

produitsRoute.put('/:id',checkToken, ProduitsControllers.updateProduit);

export default produitsRoute;