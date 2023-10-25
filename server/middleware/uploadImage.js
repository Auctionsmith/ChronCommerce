require("dotenv").config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Client = require("../config/S3Config.js");

const upload = multer({ 
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req,file,cb) {
      cb(null, {fieldName: file.fieldname})
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;