const multer = require('multer')

exports.upload = multer({
    dest:"./public/uploads",
    fileFilter,
})

function fileFilter (req, file, cb)  {
    const err = new Error("Wrong type of file")
    err.code = "WRONG_FILE_TYPE"
    
    const allowedTypes = ["image/jpeg", "image/png"]
    if (!allowedTypes.includes(file.mimetype)) cb(err, false)

    cb(null, true)
}