require("dotenv").config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');
// const { v4 : uuidv4 } = require('uuid');
const pool = require("../db/models");
const s3 = require("../config/S3Config.js");

// const uniqueKey = uuidv4();

const imageController = {};

// imageController.getImage = async (req, res, next) => {
//   const { key } = req.params;


//   const fileExtension = path.extname(req.file.originalname);

//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: `${req.params.listingId}/${uniqueKey}${fileExtension}`,
//     Expires: 60,
//   };
//   console.log(params);
//   try {
//     const url = await s3.getSignedUrlPromise("putObject", params);
//     res.locals.url = url;
//     return next();
//   } catch (e) {
//     return next(e);
//   }
// };

imageController.uploadToS3 = (req, res, next) => {
  const data = fs.readFileSync('./db.json','utf8')
  const images = JSON.parse(data)

  const newEntry = 
    {
      "name" : req.body.name,
      "imageUrl" : req.file.location
    }
    images.push(newEntry)
  fs.writeFileSync('./db.json',JSON.stringify(images))
  next()
};


module.exports = imageController;
