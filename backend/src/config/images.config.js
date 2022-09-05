const multer = require('multer')

function uploadImage(model) {
    const storage = multer.diskStorage({
        destination: `./public/images/${model}`,
        filename: function (_req, file, cb) {
            let extension = file.originalname.slice(file.originalname.lastIndexOf('.'))
            if (model==='user') {
                cb(null, `${model.email}${extension}`)
            }
            if (model==='event') {
                cb(null, `${model.title}${extension}`)
            }
            if (model==='type') {
                cb(null, `${model.type}${extension}`)
            }
            
        },
    })

    const upload = multer({storage}).single('photo')

    return upload;
}

module.exports = uploadImage