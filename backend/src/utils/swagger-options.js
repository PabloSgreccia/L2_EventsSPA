require('dotenv').config();

module.exports = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Apis Events',
            version: '1.0.0',
            description: 
            `Documentación para el uso de APIs:\n
            Para cualquier petición que requiera estar logueado, se deberá crear un atributo en el header de la petición llamado "authorization" con valor "Bearer {JWT}", donde {JWT} es el valor del token obtenido tras loguearse.

            Usuario administrador:
                - email: admin@admin.com
                - contraseña: Admin123
                
            Usuario común 1:
                - email: lasegunda@gmail.com
                - contraseña: lasegunda123
            
            Usuario común 2:
                - email: rosario@gmail.com
                - contraseña: rosario123
            `
        },
        servers: [{
            url: process.env.PHOTO,
        }]
    },
    apis: ['./src/routes/*.js'],
};