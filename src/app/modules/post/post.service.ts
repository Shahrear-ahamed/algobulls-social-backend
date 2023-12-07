// Your service code here

import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IPost } from './post.interfaces'
import Post from './post.model'

const createPost = (payload: IPost): Promise<IPost> => {
  return Post.create(payload)
}

const updatePost = async (
  id: string,
  payload: Partial<IPost>,
): Promise<IPost | null> => {
  const query = { _id: id }

  const findPost = await Post.findOne(query)

  if (!findPost) throw new ApiError(httpStatus.NOT_FOUND, 'Post not found')

  // Using updateOne for a more efficient update
  const updatedPost = await Post.updateOne(query, {
    $set: { body: payload.body },
  })

  if (updatedPost.modifiedCount === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Post not updated')
  }

  // Return the updated post
  return Post.findOne(query)
}

const deletePost = async (id: string): Promise<IPost | null> => {
  return Post.findByIdAndDelete(id)
}

const getPost = async (id: string): Promise<IPost | null> => {
  return Post.findById(id)
}

const getMyPosts = async (userId: string): Promise<IPost[]> => {
  return Post.find({ author: userId })
}

export const PostService = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getMyPosts,
}
