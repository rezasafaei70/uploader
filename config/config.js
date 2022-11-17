import * as dotenv from 'dotenv';

// loading .env file
dotenv.config();

export const storageConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_ENDPOINT_URL,
    bucket: process.env.AWS_BUCKET,
};

export const config = {
    origin:process.env.ORGIN
}