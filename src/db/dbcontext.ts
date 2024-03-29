import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dbcontext = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT) || 5432,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	ssl: true,
	logging: false,
	synchronize: true,
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
});
