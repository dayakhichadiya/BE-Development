const multer = require("multer");

//1st - store into the multer memory storage
//2nd - filter for accepting only images
//3rd - upload to multer using storage, filefilter, limit of file size

//store file temporary in memory

const storage = multer.memoryStorage();

//now multer accepts only images sooo

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true)
    } else {
        cb(new Error("Only Images are allowed"), false)
    }
}

//now upload to multer

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, //5MB
    }
})

module.exports = upload;