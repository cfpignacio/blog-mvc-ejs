import express from 'express';
import {
	noticiasIndex,
	crearNoticiaView,
	crearNoticia,
} from '../controllers/noticia.controller';

const noticiasRoutes = express.Router();

noticiasRoutes.get('/', noticiasIndex);
noticiasRoutes.get('/crear', crearNoticiaView);
noticiasRoutes.post('/crear', crearNoticia);

export default noticiasRoutes;
