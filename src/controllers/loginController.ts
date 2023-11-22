import { Request, Response } from 'express';
import { dbcontext } from '../db/dbcontext';
import { Usuarios } from '../models/usuarios.entity';
import { validationResult } from 'express-validator';

export const registerView = (req: Request, res: Response) => {
	res.render('registrar', {});
};
// For View
export const loginView = (req: Request, res: Response) => {
	res.render('login', {});
};

export const registerUser = async (req: Request, res: Response) => {
	console.log(validationResult(req));
	const userRepo = dbcontext.getRepository(Usuarios);
	console.log(req.body);
	const { email, pass, nombre, apellido } = req.body;

	if (!nombre || !email || !pass || !apellido) {
		return res.render('index');
	}

	try {
		const userExiste = await userRepo.findOneBy({ email });
		if (userExiste) {
			res.render('register', {
				nombre,
				email,
				pass,
			});
		}
		const newUsuario = userRepo.create({ nombre, email, pass, apellido });
		userRepo.save(newUsuario);
		res.redirect('/login');
	} catch (error) {
		console.log(error);
	}
};
