const sharp = require("sharp")
const fs = require('fs')

exports.resizeImage = async (req, res) => {
    try {
        await sharp(req.file.path)
              .resize(500)
              .toFile(`./public/uploads/resized/${req.file.originalname}`)
        fs.unlink(req.file.path, () => res.json({file: `./public/uploads/resized/${req.file.originalname}`}))  
             
    } catch (e) {
        console.log(e)
        res.status(422).json({msg: e})
    }
}