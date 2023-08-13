//import
const AWS = require("aws-sdk");
const fs = require("fs");

//upload Files
function Uploads(FilePath) {
  // Configure AWS credentials and region
  AWS.config.update({
    endpoint: process.env.ENDPOINT,
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: "default",
  });
  // Create an instance of the S3 service
  const s3 = new AWS.S3();
  // Specify the bucket name and file path
  const bucketName = "chatapp";
  const filePath = FilePath;
  // Read the file from disk
  const fileContent = fs.readFileSync(FilePath);

  // Set the parameters for the upload
  const params = {
    Bucket: bucketName,
    Key: filePath,
    Body: fileContent,
  };

  // Upload the file to the S3 bucket
  s3.upload(params, (err, data) => {
    if (err) {
      return "Error uploading file";
    } else {
      return "File uploaded successfully";
    }
  });
}

//Recieve Files
function Receive(FileName) {
  // Configure AWS credentials and region
  AWS.config.update({
    endpoint: process.env.ENDPOINT,
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: "default",
  });
  // Create an instance of the S3 service
  const s3 = new AWS.S3();
  // Define the bucket name and file name
  const bucketName = "chatapp";
  const fileName = FileName;

  // Create a download function

  const params = {
    Bucket: bucketName,
    Key: fileName,
  };

  // Download the file from S3
  s3.getObject(params, (err, data) => {
    if (err) {
      console.log("Error:", err);
      return;
    }

    // Save the file locally
    fs.writeFile(fileName, data.Body, (err) => {
      if (err) {
        console.log("Error:", err);
      } else {
        console.log(`File downloaded successfully as ${fileName}`);
      }
    });
  });
}

//delete Files
function Delete(FileName) {
  // Set your AWS credentials
  AWS.config.update({
    endpoint: process.env.ENDPOINT,
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: "default",
  });

  // Create an S3 service object
  const s3 = new AWS.S3();

  // Define the bucket name and file key
  const bucketName = "chatapp";
  const fileKey = FileName;

  // Define the parameters for the delete operation
  const params = {
    Bucket: bucketName,
    Key: fileKey,
  };

  // Delete the file
  s3.deleteObject(params, (err, data) => {
    if (err) {
      console.log("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
}

module.exports = { Uploads, Receive, Delete };
