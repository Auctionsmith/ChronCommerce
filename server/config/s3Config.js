require("dotenv").config();
const { S3Client } = require("@aws-sdk/client-s3");

//console.log(process.env.JAWS_ACCESS_KEY_ID);

module.exports = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.JAWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.JAWS_SECRET_ACCESS_KEY
  }
});