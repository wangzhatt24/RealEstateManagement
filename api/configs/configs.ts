import { genderEnum } from "common/enums/gender.enum";
import "dotenv/config";
import { Account } from "schemas/account/account.schema";
import { User } from "schemas/user.schema";

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

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_ExpiresIn
};

export const defaultUser: User = {
  displayName: 'default',
  address: 'default',
  phoneNumber: 'default',
  gender: genderEnum.MALE,
  avatar: null,
  account: undefined
}

export const adminUser: User = {
  displayName: process.env.SEED_ADMIN_DISPLAY_NAME,
  phoneNumber: process.env.SEED_ADMIN_PHONE_NUMBER,
  gender: genderEnum.MALE,
  avatar: process.env.SEED_ADMIN_AVATAR,
  address: process.env.SEED_ADMIN_ADDRESS,
  account: undefined
}

export const adminAccount: Account = {
  username: process.env.SEED_ADMIN_USERNAME,
  password: process.env.SEED_ADMIN_PASSWORD,
  isAdmin: Boolean(process.env.SEED_ADMIN_IS_ADMIN),
  user: adminUser
}

console.log(`
============================ENV===================================
commonConfigs:   ${JSON.stringify(commonConfigs)}
databaseConfigs: ${JSON.stringify(databaseConfigs)}
avatarConfigs:   ${JSON.stringify(avatarConfigs)}
s3Configs:       ${JSON.stringify(s3Configs)}
jwtConstants:    ${JSON.stringify(jwtConstants)}
adminAccount:    ${JSON.stringify(adminAccount)}
============================END_ENV===============================
`)