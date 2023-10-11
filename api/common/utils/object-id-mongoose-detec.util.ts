import mongoose, { isValidObjectId, ObjectId } from "mongoose";

export default function ObjectIdDetecter(id: string) {
  if(isValidObjectId(id)) {
    const objectIdAsString = String(new mongoose.Types.ObjectId(id));
    if(objectIdAsString === id) {
      return true
    } else {
      return false
    }
  }
  return false;
}