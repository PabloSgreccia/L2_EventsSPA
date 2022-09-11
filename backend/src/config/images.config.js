const multer = require('multer')
const express = require('express')
const path = require('path')
const axios = require('axios').default

function uploadImage(model) {
    // const formdata = new FormData()
    // formdata.append('media', file)
    // formdata.append('key', "00001ea325449047d932faf4d64ce263")

    // axios.post('https://thumbsnap.com/api/upload', formdata, {
    //         'Content-Type': 'multipart/form-data'
    //     })
    //     .then((response) => {
    //         console.log("aa");
    //         console.log(response);
    //     })
    //     .catch((error) => {
    //         console.log("bb");
    //         console.log(error)
    //     })

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

    //Guardar fotos en aplicacion externa




    return upload;
}

module.exports = uploadImage