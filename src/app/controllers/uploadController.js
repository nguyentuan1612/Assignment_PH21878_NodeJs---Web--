const multer = require('multer')
const store = require("store");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./uploads')
  },
  filename: function (req, file, cb) {
    store.set('nameImage',  file.originalname)
    cb(null,  file.originalname)
  }
})

const upload = multer({
  storage: storage
})

module.exports = {
  upload
}