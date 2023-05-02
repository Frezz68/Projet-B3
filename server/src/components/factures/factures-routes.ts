import { Router } from 'express';
import {checkToken} from "../../middleware/tokenMiddleware";
import * as FacturesControllers from './factures-controller';

const facturesRoute = Router();

facturesRoute.get('/', checkToken, FacturesControllers.getFactures);
facturesRoute.get('/:id', checkToken, FacturesControllers.getFactureById);
facturesRoute.put('/', checkToken, FacturesControllers.createFacture);
facturesRoute.delete('/:id', checkToken, FacturesControllers.deleteFacture);
facturesRoute.post('/:id', checkToken, FacturesControllers.updateFacture);

export default facturesRoute;