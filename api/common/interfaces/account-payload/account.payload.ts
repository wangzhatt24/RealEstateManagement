import { ObjectId } from "mongoose";

export default interface AccountPayload {
  accountId: ObjectId;
  username: string;
  isAdmin: boolean;
}