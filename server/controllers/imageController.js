const multer = require('multer');
require("dotenv").config();
const { v4 : uuidv4 } = require('uuid');
const pool = require("../db/models");
const s3 = require("../config/S3Config.js");

const uniqueKey = uuidv4();

const imageController = {};

imageController.getImage = async (req, res, next) => {
  const { key } = req.params;
  // Either we set a key and send it to client or client sets a key and sends to us
  // Either way need to store key inside of our DB and use it to query for our photos.

  const fileExtension = path.extname(req.file.originalname);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${req.params.listingId}/${uniqueKey}${fileExtension}`,
    Expires: 60,
  };
  console.log(params);
  try {
    const url = await s3.getSignedUrlPromise("putObject", params);
    res.locals.url = url;
    return next();
  } catch (e) {
    return next(e);
  }
};

imageController.uploadToS3 = (req, res, next) =>


module.exports = imageController;
