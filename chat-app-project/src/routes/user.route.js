import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';

const router = express.Router();

//route to create a new user
router.post('/', newUserValidator, userController.userRegister);

//route to Login user
router.post('/login', userController.userLogin);

export default router;
