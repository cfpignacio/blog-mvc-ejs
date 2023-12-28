import { Request, Response } from 'express';

import { dbcontext } from '../db/dbcontext';
import { Usuarios } from '../models/usuarios.entity';
import bcrypt from 'bcrypt';
import {
	IUsuarios_create,
	IUsuarios_update,
} from '../interfaces/usuarios/usuarios.interfaces';
import logger from '../helpers/logger';

export const listadoUsuarios = async (req: Request, res: Response) => {
	try {
		const usuarioRepository = await dbcontext.getRepository(Usuarios);
		const usuario = req.body.usuario;
		const usuarios = await usuarioRepository.find({
			order: {
				create_at: 'DESC',
			},
			withDeleted: true,
		});
		res.render('usuarios/listado', { usuarios, usuario });
	} catch (error) {}
};

export const crearUsuarioView = async (req: Request, res: Response) => {
	try {
		const usuario = req.body.usuario;
		res.render('usuarios/crear', { usuario });
	} catch (error) {}
};

export const crearUsuario = async (req: Request, res: Response) => {
	try {
		const data: IUsuarios_create = req.body;
		if (data.pass !== data.pass2) {
			res.render('shared/error');
			throw new Error('Contraseñas no coinciden');
		}
		const usuarioRepository = await dbcontext.getRepository(Usuarios);
		const usuario = await usuarioRepository.create({
			...data,
		});
		const result = await usuarioRepository.save(usuario);
		res.status(200).redirect('/usuarios/listado');
	} catch (error) {
		console.error(error);
		res.render('shared/error', { msgError: 'Error al crear el usuario' });
	}
};

export const editarUsuarioView = async (req: Request, res: Response) => {
	try {
		const idUsuario = req.params.idUsuario;

		const noticiaRepository = dbcontext.getRepository(Usuarios);

		const usuario = await noticiaRepository.findOne({
			where: {
				id: idUsuario,
			},
		});
		if (!usuario) {
			res.render('shared/error', { msgError: 'El usuario no existe' });
		}
		res.render('usuarios/editar', { usuario });
	} catch (error) {
		res.render('shared/error', { msgError: 'Error al editar el usuario' });
	}
};

export const editarUsuario = async (req: Request, res: Response) => {
	try {
		const data: IUsuarios_update = req.body;
		if (data.pass !== data.pass2) {
			return res.render('shared/error', {
				msgError: 'Las contraseñas no coinciden',
			});
		}
		const usuarioRepository = await dbcontext.getRepository(Usuarios);
		const usuario = await usuarioRepository.exist({
			where: {
				id: req.params.idUsuario,
			},
		});
		if (!usuario) {
			res.render('shared/error', { msgError: 'El usuario no existe' });
		}

		// // Comparacion pw
		// const usuarioAComparar = await usuarioRepository.findOneBy({
		// 	id: req.params.idUsuario,
		// });
		// if (usuarioAComparar) {
		// 	const comparacion = await bcrypt.compare(
		// 		req.body.password,
		// 		usuarioAComparar.password
		// 	);
		// 	if (comparacion) {
		// 		const editarUsuario: IUsuarios_update = {
		// 			nombre: req.body.nombre,
		// 			apellido: req.body.apellido,
		// 		};
		// 		await usuarioRepository.update(req.params.idUsuario, editarUsuario);
		// 	} else {
		// 		console.log('contraseña incorrecta')
		// 		res.render('shared/error');
		// 	}
		// }
		const editarUsuario: IUsuarios_update = {
			nombre: req.body.nombre,
			apellido: req.body.apellido,
		};
		await usuarioRepository.update(req.params.idUsuario, editarUsuario);
		res.status(200).redirect('/usuarios/listado');
	} catch (error) {
		console.log(error);
		res.render('shared/error', { msgError: 'Error al editar el usuario' });
	}
};

export const eliminarUsuario = async (req: Request, res: Response) => {
	try {
		const idUsuario = req.params.idUsuario;
		const usuarioRepository = await dbcontext.getRepository(Usuarios);
		const usuario = await usuarioRepository.findOne({
			where: {
				id: idUsuario,
			},
		});
		if (!usuario) {
			res.render('shared/error', {
				msgError: 'No se pudo encontrar el usuario',
			});
		}
		await usuarioRepository.softDelete(idUsuario);
		res.redirect('/usuarios/listado');
	} catch (error) {
		console.log(error);
		res.render('shared/error', { msgError: 'Error al eliminar el usuario' });
	}
};

export const recuperarUsuario = async (req: Request, res: Response) => {
	try {
		const idUsuario = req.params.idUsuario;
		const noticiaRepository = await dbcontext.getRepository(Usuarios);
		await noticiaRepository.restore(idUsuario);
		res.redirect('/usuarios/listado');
	} catch (error) {
		console.log(error);
		res.render('shared/error', { msgError: 'Error al recuperar el usuario' });
	}
};

export const primerUsuario = async () => {
	try {
		const usuarioRepository = await dbcontext.getRepository(Usuarios);
		const contarUsuarios = await usuarioRepository.find();

		if (contarUsuarios.length <= 0) {
			const usuarioDefault: IUsuarios_create = {
				nombre: 'admin',
				apellido: 'Default',
				pass: '123456',
				pass2: '123456',
				email: 'admin@local.com',
			};

			const createUsuario = await usuarioRepository.create(usuarioDefault);
			const saveUsuario = await usuarioRepository.save(createUsuario);
			logger.info(
				`Se creo el usuario : ${saveUsuario.nombre} ${saveUsuario.apellido} - ${saveUsuario.email}`
			);
		}
	} catch (error) {
		logger.error(error);
	}
};
