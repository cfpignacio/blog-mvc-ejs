import { Request, Response } from 'express';
import logger from '../helpers/logger';
import {
	Inoticias_create,
	Inoticias_update,
} from '../interfaces/noticias/noticias.interfaces';
import { IsNull, Not } from 'typeorm';
import { dbcontext } from '../db/dbcontext';
import { Noticia } from '../models/noticias.entity';
import session from 'express-session';

export const noticiasIndex = async (req: Request, res: Response) => {
	// Aca devolver todas las noticias ordenadas por fecha
	// ver documentacion de typeorm
	const noticiaRepository = dbcontext.getRepository(Noticia);
	const usuario = req.session?.user ?? '';
	const noticias = await noticiaRepository.find({
		order: { create_at: 'DESC' },
		take: 10,
		withDeleted: false,
	});

	res.render('home/index_view_noticias', {
		noticias,
		usuario,
	});
};

export const crearNoticiaView = (req: Request, res: Response) => {
	const usuario = req.body.usuario;
	res.render('noticias/crear', { usuario });
};

export const crearNoticia = async (req: Request, res: Response) => {
	const data: Inoticias_create = req.body;

	try {
		if (data.titulo.trim() == '' || data.contenido.trim() == '') {
			throw new Error('Esta vacio');
		}

		const noticiaRepository = dbcontext.getRepository(Noticia);
		console.log(req.body);
		const noticia = noticiaRepository.create({
			...data,
		});

		const result = await noticiaRepository.save(noticia);
		res.status(200).redirect('/noticias');
	} catch (error) {
		console.error(error);
		res.status(500).render('shared/error');
	}
};

export const getNoticiaById = async (req: Request, res: Response) => {
	console.log(req.params);
	const noticiaRepository = dbcontext.getRepository(Noticia);
	const noticia = await noticiaRepository.findOneBy({
		id: req.params.idNoticia,
	});
	res.send({ noticia });
};

export const editarNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = dbcontext.getRepository(Noticia);
		const noticia = await noticiaRepository.exist({
			where: { id: req.params.idNoticia },
		});
		if (!noticia) {
			res.render('shared/error');
		}
		const editNoticia: Inoticias_update = {
			titulo: req.body.titulo,
			contenido: req.body.contenido,
		};
		await noticiaRepository.update(req.params.idNoticia, editNoticia);

		res.redirect('/noticias/listado');
	} catch (error) {
		res.render('shared/error', { msgError: 'Error al editarnoticia' });
	}
};

export const editarNoticiaView = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = dbcontext.getRepository(Noticia);
		const noticia = await noticiaRepository.findOne({
			where: { id: req.params.idNoticia },
		});
		if (!noticia) {
			res.render('shared/error', { msgError: 'La noticia no existe' });
		}

		res.render('noticias/editar', { noticia });
	} catch (error) {
		res.render('shared/error', {
			msgError: 'La noticia no se puedo actulizar',
		});
	}
};

export const listadoNoticias = async (req: Request, res: Response) => {
	const noticiaRepository = dbcontext.getRepository(Noticia);
	const usuario = req.body.usuario;
	const noticias = await noticiaRepository.find({
		order: { create_at: 'DESC' },
		withDeleted: true,
	});
	res.render('noticias/listado', { noticias, usuario });
};

export const borrarNoticia = async (req: Request, res: Response) => {
	const noticiaRepository = dbcontext.getRepository(Noticia);
	const noticia = await noticiaRepository.findOne({
		where: { id: req.params.idNoticia },
	});
	if (!noticia) {
		res.render('shared/error');
	}
	await noticiaRepository.softDelete(req.params.idNoticia);
	res.redirect('/noticias/listado');
};
