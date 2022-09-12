const multer = require('multer')
const express = require('express')
const path = require('path')
const axios = require('axios').default

// Defines path and name of the image to be saved
function uploadImage(model) {

    const storage = multer.diskStorage({
        destination: './public/images/upload',
        filename: function (_req, file, cb) {
            let extension = file.originalname.slice(file.originalname.lastIndexOf('.'))
            cb(null, Date.now() + extension)

            console.log(file);
       
        }
    })

    const upload = multer({
        storage
    }).single('photo')




    return upload;
}

module.exports = uploadImage