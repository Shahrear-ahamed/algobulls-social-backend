// Your service code here

import Comment from './comment.model'
import { IComment } from './comment.interfaces'
import Post from '../post/post.model'
import mongoose from 'mongoose'

// create comment
const createComment = async (payload: IComment) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const comment = await Comment.create(payload)

    if (!comment) {
      throw new Error('Comment not created')
    }

    // set comment id into post
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: payload.postId },
      { $push: { comments: comment._id } },
      { new: true },
    ).session(session)

    if (!updatedPost) {
      throw new Error('Post not found')
    }

    await session.commitTransaction()
    session.endSession()

    return updatedPost
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

// update comment
const updateComment = async (id: string, payload: IComment) => {
  // find comment by id
  const comment = await Comment.findById(id)

  // if comment not found
  if (!comment) {
    throw new Error('Comment not found')
  }

  // update comments
  const updateComment = await Comment.updateOne({ _id: id }, payload)

  console.log(updateComment)

  if (updateComment.modifiedCount === 0) {
    throw new Error('Comment not updated')
  }

  // return updated comment
  return Comment.findById(id)
}

// delete comment
const deleteComment = async (id: string) => {
  // find comment by id
  const comment = await Comment.findById(id)

  // if comment not found
  if (!comment) {
    throw new Error('Comment not found')
  }

  // delete comment
  await Comment.deleteOne({ _id: id })
}

// get comment by id
const getCommentById = async (id: string) => {
  // find comment by id
  const comment = await Comment.findById(id)

  // if comment not found
  if (!comment) {
    throw new Error('Comment not found')
  }

  // return comment
  return comment
}

export const CommentService = {
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
}
