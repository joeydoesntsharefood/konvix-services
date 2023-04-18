import { Request, Response, Router } from 'express';
import { SigninController, SignupController } from './controllers/unauth.controller';
import { ClientController } from './controllers/client.controller';
import { IndexUser, ListUsers } from './controllers/user.controller';
import { SaleController } from './controllers/sale.controller';

const router = Router();

router.post('/signin', SigninController);
router.post('/signup', SignupController);

router.get('/clients', ClientController.List);
router.post('/clients', ClientController.Create);
router.post('/clients/:id', ClientController.Edit);
router.delete('/clients/:id', ClientController.Delete);

router.get('/user', ListUsers);
router.get('/user/:cod_usuario', IndexUser);

router.post('/sale', SaleController.create);
router.get('/sale', SaleController.list);

export default router;