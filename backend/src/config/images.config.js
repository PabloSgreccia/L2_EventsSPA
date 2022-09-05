const multer = require('multer')

function uploadImage(model) {
    const storage = multer.diskStorage({
        destination: './public/images/upload',
        filename: function (_req, file, cb) {
            let extension = file.originalname.slice(file.originalname.lastIndexOf('.'))
            cb(null, Date.now()+extension)
        },
    })

    const upload = multer({storage}).single('photo')

    return upload;
}

module.exports = uploadImage