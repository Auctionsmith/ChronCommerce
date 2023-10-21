// require("aws-sdk/lib/maintenance_mode_message").suppress = true;
require("dotenv").config();
// const AWS = require("aws")
const AWS = require("aws-sdk");
const { S3Client } = require("@aws-sdk/client-s3");

exports.s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  signatureVersion: "v4",
});