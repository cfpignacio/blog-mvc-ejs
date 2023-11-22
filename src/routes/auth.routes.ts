import express from 'express';
import {
	loginController,
	logoutController,
	quiensoyController,
} from '../controllers/auth.controller';

const authRoutes = express.Router();

// rutas de ejemplo de sessiones
authRoutes.get('/login', loginController);

authRoutes.get('/quiensoy', quiensoyController);

authRoutes.get('/logout', logoutController);

export default authRoutes;
