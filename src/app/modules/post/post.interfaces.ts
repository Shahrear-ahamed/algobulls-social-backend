// Define your interfaces here

import { Types } from 'mongoose'

export type IPost = {
  body: string
  author: Types.ObjectId
  likes: string[]
  comments: string[]
}
