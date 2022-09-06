require('dotenv').config();

module.exports = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Apis Events',
            version: '1.0.0',
            description: 'Apis Events documentation'
        },
        servers: [{
            url: process.env.PHOTO,
        }]
    },
    apis: ['./src/routes/*.js'],
};