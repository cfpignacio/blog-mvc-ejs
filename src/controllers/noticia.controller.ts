import { Request, Response } from 'express';

export const noticiasIndex = (req: Request, res: Response) => {
	// Aca devolver todas las noticias ordenadas por fecha

	const nombre = 'Pedro';
	res.render('home/index', { nombre });
};
