import 'dotenv/config';
import express from 'express';
import path from 'path';
import { dbcontext } from './src/db/dbcontext';
import { TypeORMError } from 'typeorm';
import logger from './src/helpers/logger';
import noticiasRoutes from './src/routes/noticia.routes';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();
const port = process.env.PORT || 3000;
dbcontext
	.initialize()
	.then(() => {})
	.catch((err: TypeORMError) => {
		logger.error(`Error al iniciar la base de datos: ${err.message}`); // si hay error
	});

// Middleware para analizar cookies
app.use(cookieParser());

// Middleware para gestionar sesiones
app.use(
	session({
		secret: 'my-secret-key',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }, // Configuración de la cookie (ajústala según tus necesidades)
	})
);

//Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/noticias', noticiasRoutes);

// Ruta de inicio de sesión
app.get('/login', (req, res) => {
	if (req.session) {
		req.session.user = { id: 1, username: 'usuarioEjemplo' };
	}

	res.send('Inicio de sesión exitoso.');
});

app.get('/t', (req, res) => {
	if (req.session) {
		res.send(req.session.user);
	}
});

app.listen(port, () => {
	console.log(`Servidor Express funcionando en http://localhost:${port} 🚀✅`);
});
