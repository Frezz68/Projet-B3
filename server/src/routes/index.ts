import { Router } from 'express';
import userRoutes from '../components/users/users-routes';
import facturesRoutes from '../components/factures/factures-routes';
import clientsRoutes from '../components/clients/clients-routes';
import produitsRoutes from '../components/produits/produits-routes';

const API_V1_ROUTER = Router();

//initialisation de toutes les routes
API_V1_ROUTER.use('/user', userRoutes);

API_V1_ROUTER.use('/facture', facturesRoutes);

API_V1_ROUTER.use('/client', clientsRoutes);

API_V1_ROUTER.use('/produit', produitsRoutes);





export default API_V1_ROUTER;