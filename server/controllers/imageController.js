const path = require('path');
require("dotenv").config();
const fs = require('fs');
//const multer = require('multer');
//const multerS3 = require('multer-s3');
// const { v4 : uuidv4 } = require('uuid');
//const pool = require("../db/models");
//const s3 = require("../config/S3Config.js");

// const uniqueKey = uuidv4();

const imageController = {};

imageController.uploadToJSON = (req, res, next) => {
  try {
    const dbPath = path.join(__dirname, '..', 'db.json');
    const data = fs.readFileSync(dbPath,'utf8');
  
    const images = JSON.parse(data);
    const newEntry = {
      "name" : req.body.name,
      "imageUrl" : req.file.location
    };
    
    images.push(newEntry);
    fs.writeFileSync(dbPath, JSON.stringify(images, null, 4));

    return next();
  } catch (err) {
    console.error("Error saving to db.json:", err);
    next(err);
  }
};

module.exports = imageController;
