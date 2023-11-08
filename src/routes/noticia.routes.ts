import express from 'express';

const noticiasRoutes = express.Router();

noticiasRoutes.get('/', (req, res) => {
	const nombre = 'Pedro';
	res.render('home/index', { nombre });
});

export default noticiasRoutes;
