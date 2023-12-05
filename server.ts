import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { dbcontext } from './src/db/dbcontext';
import { TypeORMError } from 'typeorm';
import logger from './src/helpers/logger';
import noticiasRoutes from './src/routes/noticia.routes';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import authRoutes from './src/routes/auth.routes';
import expressLayouts from 'express-ejs-layouts';
import { noticiasIndex } from './src/controllers/noticia.controller';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dbcontext
	.initialize()
	.then(() => {})
	.catch((err: TypeORMError) => {
		logger.error(`Error al iniciar la base de datos: ${err.message}`); // si hay error
	});

// configuracion de cookie y sessiones
app.use(cookieParser());
app.use(
	session({
		secret: 'acatienequeirmisecreto',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

//Configurar EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'src/views'));
app.set('layout', path.join(__dirname, 'src/views/shared/layout'));

const port = process.env.PORT || 3000;

app.use('/noticias', noticiasRoutes);
app.use('/auth', authRoutes);

// default route
app.use('/', (req: Request, res: Response) => {
	res.redirect('/noticias');
});

app.listen(port, () => {
	console.log(`Servidor Express funcionando en http://localhost:${port} 🚀✅`);
});
