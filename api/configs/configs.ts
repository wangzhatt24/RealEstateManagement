import "dotenv/config";

export const commonConfigs = {
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT, 10)
}

export const databaseConfigs = {
  uri: process.env.DATABASE_MONGO_URI
}

export const avatarConfigs = {
  maxSize: Number(process.env.AVATAR_MAX_SIZE),
  fileTypeRegex: new RegExp(process.env.AVATAR_TYPES_REGEX)
}

export const s3Configs = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: process.env.AWS_BUCKET,
  baseURL: `https://s3batdongsan.s3.ap-southeast-1.amazonaws.com/`
}