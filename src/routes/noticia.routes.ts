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

const noticiasRoutes = express.Router();

noticiasRoutes.get('/', noticiasIndex);
noticiasRoutes.get('/by/:idNoticia', getNoticiaById);

// Listado
noticiasRoutes.get('/listado', listadoNoticias);
//crear
noticiasRoutes.get('/crear', crearNoticiaView);
noticiasRoutes.post('/crear', crearNoticia);
//editar
noticiasRoutes.get('/editar/:idNoticia', editarNoticiaView);

noticiasRoutes.post('/editar/:idNoticia', editarNoticia);

//delete
noticiasRoutes.get('/borrar/:idNoticia', borrarNoticia);

export default noticiasRoutes;
