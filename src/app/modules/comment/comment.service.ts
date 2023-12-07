// Your service code here

import Comment from './comment.model'
import { IComment } from './comment.interfaces'

// create comment
const createComment = async (payload: IComment) => {
  return Comment.create(payload)
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
