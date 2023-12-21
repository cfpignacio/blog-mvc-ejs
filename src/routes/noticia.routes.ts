import express from 'express';
import {
	noticiasIndex,
	crearNoticiaView,
	crearNoticia,
	getNoticiaById,
	editarNoticiaView,
	editarNoticia,
	listadoNoticias,
	borrarNoticia,
} from '../controllers/noticia.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const noticiasRoutes = express.Router();

noticiasRoutes.get('/', noticiasIndex);
noticiasRoutes.get('/by/:idNoticia', getNoticiaById);

// Listado
noticiasRoutes.get('/listado', authMiddleware, listadoNoticias);
//crear
noticiasRoutes.get('/crear', authMiddleware, crearNoticiaView);
noticiasRoutes.post('/crear', authMiddleware, crearNoticia);
//editar
noticiasRoutes.get('/editar/:idNoticia', authMiddleware, editarNoticiaView);

noticiasRoutes.post('/editar/:idNoticia', authMiddleware, editarNoticia);

//delete
noticiasRoutes.get('/borrar/:idNoticia', authMiddleware, borrarNoticia);

export default noticiasRoutes;
