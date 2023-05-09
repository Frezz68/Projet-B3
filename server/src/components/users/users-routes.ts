import { Router } from 'express';
import { checkToken } from '../../middleware/tokenMiddleware';
import * as UserControllers from './users-controller';


const userRoute = Router();

userRoute.get('/',checkToken, UserControllers.getUsers);
userRoute.get('/:id',checkToken, UserControllers.getUserById);
userRoute.post('/login', UserControllers.login);
userRoute.post('/protected/extend_session',checkToken, UserControllers.extendSession);
userRoute.put('/register', UserControllers.register);
userRoute.delete('/:id',checkToken, UserControllers.deleteUser);

export default userRoute;