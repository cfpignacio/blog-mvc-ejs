## Guia
* Crear carpeta "nombredelproyecto"
* Ingresar a la carpeta con  ```cd nombredelproyecto```
* Ejecutar el comando ```npm init -y```
* Instalar todas la dependencias necesarias para iniciar el proyecto
    ```
    npm install express dotenv ejs 
    ```
    Dependencias de desarollo 

    ```
    npm install -D @types/express @types/node
    ```
* Crear archivo tsconfig.json
```
{
    "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "outDir": "./dist",
        "strict": true,
        "esModuleInterop": true,
    }
}
```

* Crear estructara 
```
test-mvc-express/
  ├─ src/
  │   ├─ controllers/
  │   ├─ views/
  │   ├─ routes/
  │   ├─ models/
  ├─ server.ts
  ├─ package.json
  ├─ tsconfig.json

```

* agregar script en el package.json
```
		"dev": "nodemon server.ts"
```

* Crear repositorio en git con github Desktop
  