const express = require("express");
const router = express.Router();
const multer = require('multer');
const imageController = require("../controllers/imageController");

const storage = multer.memoryStorage();
const limits = {fileSize: 5 * 1024 * 1024};
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === 'image') {
    cb(null, true)
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({ storage, limits, fileFilter });

// router.get("/", imageController.getImage, (req, res, next) => {
//   const { url } = res.locals;
//   return res.status(200).json(url);
// });

// router.post("/upload", upload.single('imageField'), imageController.uploadToS3, (req, res, next) => {
//   const { url } = res.locals;
//   return res.status(200).json(url);
// });
router.post("/upload", upload.single('imageField'), (req, res, next) => {
  const { url } = res.locals;
  return res.status(200).json(url);
});

module.exports = router;
