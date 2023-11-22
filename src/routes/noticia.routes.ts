import express from 'express';
import { noticiasIndex } from '../controllers/noticia.controller';

const noticiasRoutes = express.Router();

noticiasRoutes.get('/', noticiasIndex);

export default noticiasRoutes;
