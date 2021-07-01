const util = require("util");
const multer = require("multer");
const path = require('path');
const jwt = require('jsonwebtoken');
const maxSize = 2 * 1024 * 1024;
__basedir = path.resolve();
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/assets/uploads/");
    },
    filename: (req, file, cb) => {
        const fname = jwt.verify(req.headers.authorization, "mysalt").uid
        console.log(file.originalname);
        cb(null, fname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;