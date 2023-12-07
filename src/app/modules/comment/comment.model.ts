import { Schema, model } from 'mongoose'
import { IComment } from './comment.interfaces'

const commentSchema = new Schema<IComment>(
  {
    body: {
      type: String,
    },
    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  },
)

const Post = model('Post', commentSchema)

export default Post
