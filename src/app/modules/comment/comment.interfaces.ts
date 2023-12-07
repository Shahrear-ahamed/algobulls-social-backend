import { Types } from "mongoose"

// Define your interfaces here
export type IComment = {
  body: string
  userId: Types.ObjectId
  postId: Types.ObjectId
}
