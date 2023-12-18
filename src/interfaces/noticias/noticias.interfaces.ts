export interface Inoticias_create {
	titulo: string;
	contenido: string;
	imagenURL?: string;
}

export interface Inoticias_update extends Inoticias_create {}
