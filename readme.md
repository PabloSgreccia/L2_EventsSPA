
### Descripción
SPA de eventos donde un usuario puede crear eventos y compartirlos con el resto del mundo.
Del mismo modo, cualquier usuario podrá checkear los proximos eventos e indicar que participarán en él.
También podrás visitar el perfil de otros usuarios para ver que eventos creó o participó.
Y muchas mas funcionalidades, te invitamos a probarlas todas!

### Autores:
    - Galetto, Adelmar
    - Sgreccia, Pablo

### Tecnologías utilizadas:
    - Backend: NodeJs + (Javascript, Express, JWT)
    - Frontend: Angular + (HTML, CSS, Typescript)
    - Base de datos SQL +  Sequelize (ORM)

### Pasos para correr el proyecto (versión localhost):
    0. Asegurarse tener instalado: NodeJs, Angular-CLI, y acceso a alguna base de datos SQL a la cual acceder
    1. Descargar el código
    2. Instalar dependencias necesarias: ejecutar "npm i" en consola. Hacerlo dos veces, una vez parados en la carpeta "backend" y otra en "frontend"
    3. Configurar variables de entorno del backend:
        3.1: crear un archivo llamado ".env" dentro de la carpeta "backend"
        3.1: usar el documento ubicado en './env-backend.txt' como referencia para completar el archivo ".env" previamente creado
    4. Ejecutar servidor de backend: ejecutar "npm start" (o "npm run dev") en consola, dentro de la carpeta "backend"
        4.1: En caso de ejcutar "npm run dev", para setear la base de datos tambien deberá ejecutar "npx sequelize-cli db:create", "npx sequelize-cli db:migrate"
        4.2: Ejecutar "npx sequelize-cli db:seed:all" en consola, en caso de querer tener datos por default
    5. Ejecutar servidor de backend frontend: ejecutar "ng serve", en consola, dentro de la carpeta "frontend"
    6. Abrir un buscador y colocar "http://localhost:4200" en la URL.

### Datos precargados:
    Usuario administrador:
        - email: admin@admin.com
        - contraseña: Admin123
        
    Usuario común 1:
        - email: lasegunda@gmail.com
        - contraseña: lasegunda123
    
    Usuario común 2:
        - email: rosario@gmail.com
        - contraseña: rosario123
