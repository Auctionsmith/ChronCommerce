require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Client = require("../config/S3Config.js");
const imageController = require("../controllers/imageController");

// const limits = {fileSize: 5 * 1024 * 1024};

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.split("/")[0] === 'image') {
//     cb(null, true)
//   } else {
//     cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
//   }
// };

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


//limits, fileFilter

router.post("/upload", upload.single('auctionImage'), (req, res) => {
  console.log(req.body.name);
  res.status(200).send('Successfully uploaded');
});


module.exports = upload;

// router.get("/", imageController.getImage, (req, res, next) => {
//   const { url } = res.locals;
//   return res.status(200).json(url);
// });