const multer = require('multer')

function uploadImage() {
    const storage = multer.diskStorage({
        destination: './public/images',
        filename: function (_req, file, cb) {
            let extension = file.originalname.slice(file.originalname.lastIndexOf('.'))
            cb(null, Date.now()+extension)
        },
    })

    const upload = multer({storage}).single('photo')

    return upload;
}

module.exports = uploadImage