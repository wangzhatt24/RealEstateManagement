import "dotenv/config";

export const commonConfigs = {
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT, 10)
}

export const databaseConfigs = {
  uri: process.env.DATABASE_MONGO_URI
}