import { Schema, model } from 'mongoose'
import { IUser } from './auth.interfaces'
import bcrypt from 'bcrypt'
import config from '../../../config'

const userSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: String,
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
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

userSchema.pre('save', async function (next) {
  // hashing user password
  this.password = await bcrypt.hash(this.password, Number(config.saltRound))

  next()
})

const User = model<IUser>('User', userSchema)

export default User
