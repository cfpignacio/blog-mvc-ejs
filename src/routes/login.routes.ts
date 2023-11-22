import express from 'express';
import {
	loginView,
	registerUser,
	registerView,
} from '../controllers/loginController';
import { loginValidator } from './loginvalid';
const loginRoutes = express.Router();

loginRoutes.get('/registrar', registerView);
loginRoutes.post('/registrar', loginValidator, registerUser);
loginRoutes.get('/login', loginView);
export default loginRoutes;
