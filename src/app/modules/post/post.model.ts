import { Schema, model } from 'mongoose'
import { IPost } from './post.interfaces'

const postSchema = new Schema<IPost>(
  {
    body: {
      type: String,
      require: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
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

const Post = model('Post', postSchema)

export default Post
