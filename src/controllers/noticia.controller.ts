import { Request, Response } from 'express';

export const noticiasIndex = (req: Request, res: Response) => {
	// Aca devolver todas las noticias ordenadas por fecha
	// ver documentacion de typeorm
	const nombre = 'Pedro';
	res.render('home/index', { nombre });
};

export const crearNoticiaView = (req: Request, res: Response) => {
	res.render('noticias/crear');
};
