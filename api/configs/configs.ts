import { genderEnum } from "common/enums/gender.enum";
import { PostStateEnum } from "common/enums/post-state.enum";
import ObjectIdDetecter from "common/utils/object-id-mongoose-detec.util";
import "dotenv/config";
import { AccountState } from "schemas/account/account-state.schema";
import { Account } from "schemas/account/account.schema";
import { PostState } from "schemas/post/post-state.schema";
import { RealEstatePost } from "schemas/post/post.schema";
import { User } from "schemas/user.schema";

export const commonConfigs = {
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT, 10),
  appUrl: process.env.APP_URL
}

export const databaseConfigs = {
  uri: process.env.DATABASE_MONGO_URI
}

export const avatarConfigs = {
  maxSize: Number(process.env.AVATAR_MAX_SIZE),
  fileTypeRegex: new RegExp(process.env.AVATAR_TYPES_REGEX)
}

export const realEstateImagesConfigs = {
  maxSize: Number(process.env.REAL_ESTATE_IMAGES_MAX_SIZE),
  fileTypeRegex: new RegExp(process.env.REAL_ESTATE_IMAGES_TYPES_REGEX)
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
  account: undefined,
  email: 'default',
  broker: undefined,
  realEstatePosts: undefined,
  userSavePosts: undefined
}

export const defaultPostState: PostState = {
  state: PostStateEnum.New,
  post: undefined
}

export const defaultAccountState: AccountState = {
  lockedReason: '',
  executor: undefined,
  target: undefined
}

export const adminUser: User = {
  displayName: process.env.SEED_ADMIN_DISPLAY_NAME,
  phoneNumber: process.env.SEED_ADMIN_PHONE_NUMBER,
  gender: genderEnum.MALE,
  avatar: process.env.SEED_ADMIN_AVATAR,
  address: process.env.SEED_ADMIN_ADDRESS,
  account: undefined,
  email: process.env.SEED_ADMIN_EMAIL,
  broker: undefined,
  realEstatePosts: undefined,
  userSavePosts: undefined
}

export const adminAccountState: AccountState = {
  lockedReason: '',
  executor: undefined,
  target: undefined
}

export const adminAccount: Account = {
  username: process.env.SEED_ADMIN_USERNAME,
  password: process.env.SEED_ADMIN_PASSWORD,
  isAdmin: Boolean(process.env.SEED_ADMIN_IS_ADMIN),
  user: adminUser,
  accountState: adminAccountState
}

export const bcryptConfigs = {
  saltRounds: Number(process.env.SALT_ROUNDS)
}

export const mailerConfigs = {
  user: process.env.GMAIL_APP_USERNAME,
  password: process.env.GMAIL_APP_PASSWORD
}

console.log(`
============================ENV===================================
commonConfigs:   ${JSON.stringify(commonConfigs)}
databaseConfigs: ${JSON.stringify(databaseConfigs)}
avatarConfigs:   ${JSON.stringify(avatarConfigs)}
s3Configs:       ${JSON.stringify(s3Configs)}
jwtConstants:    ${JSON.stringify(jwtConstants)}
adminAccount:    ${JSON.stringify(adminAccount)}
bcryptConfigs:   ${JSON.stringify(bcryptConfigs)}
mailerConfigs:   ${JSON.stringify(mailerConfigs)}
defautlPostState:${JSON.stringify(defaultPostState)}
============================END_ENV===============================
`)