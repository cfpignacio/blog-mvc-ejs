import { Request, Response } from 'express';
import logger from '../helpers/logger';
import { Inoticias_create } from '../interfaces/noticias/noticias.interfaces';
import { IsNull } from 'typeorm';

export const noticiasIndex = (req: Request, res: Response) => {
	// Aca devolver todas las noticias ordenadas por fecha
	// ver documentacion de typeorm
	const nombre = 'Pedro';
	res.render('home/index', { nombre });
};

export const crearNoticiaView = (req: Request, res: Response) => {
	res.render('noticias/crear');
};

export const crearNoticia = (req: Request, res: Response) => {
	const data: Inoticias_create = req.body;

	console.log(data);

	res.redirect('/noticias');
};
