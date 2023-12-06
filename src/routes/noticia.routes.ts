import express from 'express';
import {
	noticiasIndex,
	crearNoticiaView,
	crearNoticia,
	getNoticiaById,
	editarNoticiaView,
	editarNoticia,
} from '../controllers/noticia.controller';

const noticiasRoutes = express.Router();

noticiasRoutes.get('/', noticiasIndex);
noticiasRoutes.get('/:idNoticia', getNoticiaById);
//crear
noticiasRoutes.get('/crear', crearNoticiaView);
noticiasRoutes.post('/crear', crearNoticia);
//editar
noticiasRoutes.get('/editar/:idNoticia', editarNoticiaView);
noticiasRoutes.post('/editar/:idNoticia', editarNoticia);

export default noticiasRoutes;
