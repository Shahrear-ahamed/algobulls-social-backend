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

const Comment = model('Comment', commentSchema)

export default Comment
