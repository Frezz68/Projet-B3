import { Router } from 'express';
import {checkToken} from "../../middleware/tokenMiddleware";
import * as FacturesControllers from './factures-controller';

const facturesRoute = Router();

// initialisation des routes pour les factures avec leurs méthodes et middlewares
facturesRoute.get('/', checkToken, FacturesControllers.getFactures);
facturesRoute.get('/:id', checkToken, FacturesControllers.getFactureById);
facturesRoute.post('/', checkToken, FacturesControllers.createFacture);
facturesRoute.delete('/:id', checkToken, FacturesControllers.deleteFacture);
facturesRoute.put('/:id', checkToken, FacturesControllers.updateFacture);

facturesRoute.post('/:id/produit', checkToken, FacturesControllers.addProduitToFacture);
facturesRoute.delete('/:id/produit/:idProduit', checkToken, FacturesControllers.deleteProduitFromFacture);
facturesRoute.put('/:id/produit/:idProduit', checkToken, FacturesControllers.updateProduitFromFacture);

export default facturesRoute;