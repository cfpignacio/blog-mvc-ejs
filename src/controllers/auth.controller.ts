import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { dbcontext } from '../db/dbcontext';
import { Usuarios } from '../models/usuarios.entity';
import { ErrorDescription } from 'typeorm';

export const loginController = async (req: Request, res: Response) => {
	try {
		const usuarioRepository = await dbcontext.getRepository(Usuarios);
		const usuario = await usuarioRepository.findOneBy({
			email: req.body.email,
		});
		if (usuario) {
			const passCorrecto = await bcrypt.compare(req.body.pass, usuario.pass);
			if (passCorrecto && req.session) {
				req.session.user = {
					id: usuario.id,
					email: usuario.email,
					nombreCompleto: `${usuario.nombre} ${usuario.apellido}`,
				};
				res.redirect('/noticias');
			} else {
				throw new Error('Usuario/Password Incorrecto');
			}
		} else {
			throw new Error('Usuario/Password Incorrecto');
		}
	} catch (error) {
		console.log(error);
		res.render('shared/error', { msgError: error });
	}

	// existe el email ?
	// si existe
	// verifico password
};

export const loginControllerView = (req: Request, res: Response) => {
	res.render('auth/login', { layout: false });
};

export const quiensoyController = (req: Request, res: Response) => {
	if (req.session?.user) {
		const user = req.session.user;

		res.send({ user });
	} else {
		res.send('No estas logueado');
	}
};

export const logoutController = (req: Request, res: Response) => {
	req.session?.destroy((err) => {});
	res.send('Session cerrada correctamente');
};
