"use strict";

// Need to use AWS
const AWS = require("aws-sdk");

// Creating new S3 instance
const s3 = new AWS.S3({ signatureVersion: "v4" });

// Bucket name we are going to connect
const bucketName = "shashith-test-bucket-for-file-upload";

// Epiration Time of the presignedUrl
const expirationInSeconds = 120;

exports.handler = async (event, context) => {
    // Reading the file name from the request. (For this you can do according to your requirment)
    const key = event.queryStringParameters.fileName;

    // Params object for creating the
    const params = {
        Bucket: bucketName,
        Key: key,
        Expires: expirationInSeconds
    };
    try {
        // Creating the presigned Url
        const preSignedURL = await s3.getSignedUrl("putObject", params);
        let returnObject = {
            statusCode: 200,
            headers: {
                "access-control-allow-origin": "*"
            },
            body: JSON.stringify({
                fileUploadURL: preSignedURL
            })
        };
        return returnObject;
    } catch (e) {
        const response = {
            err: e.message,
            headers: {
                "access-control-allow-origin": "*"
            },
            body: "error occured"
        };
        return response;
    }
};
