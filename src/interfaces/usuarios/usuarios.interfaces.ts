export interface IUsuarios_create {
	id?: string;
	email?: string;
	pass?: string;
	pass2?: string;
	nombre: string;
	apellido: string;
}

export interface IUsuarios_update extends IUsuarios_create {}
