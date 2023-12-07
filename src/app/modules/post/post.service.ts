// Your service code here

import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IPost } from './post.interfaces'
import Post from './post.model'
import User from '../auth/auth.model'

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

// delete a post
const deletePost = async (id: string): Promise<IPost | null> => {
  return Post.findByIdAndDelete(id)
}

// get a post
const getPost = async (id: string): Promise<IPost | null> => {
  return Post.findById(id)
}

// get my posts
const getMyPosts = async (userId: string): Promise<IPost[]> => {
  const myPosts = await Post.find({ author: userId })
  console.log(myPosts)
  return myPosts
}

// get all posts
const getAllPosts = async (userId: string): Promise<IPost[]> => {
  const posts = await Post.find()
    .populate('author', 'name email avatar')
    .sort('-createdAt')

  const user = await User.findById(userId).select('bookmarks')

  // If the user is not found, throw an error
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  // Add the isLiked property to each post
  const postsWithIsLikedAndBookmarked = posts.map(post => {
    const isLiked = post.likes.includes(userId)
    const isBookmarked = user.bookmarks.includes(String(post._id))
    return { ...post.toJSON(), isLiked, isBookmarked }
  })

  return postsWithIsLikedAndBookmarked
}

// like a post
const likeAPost = async (postId: string, userId: string) => {
  const query = { _id: postId }

  const findPost = await Post.findById(query)

  if (!findPost) throw new ApiError(httpStatus.NOT_FOUND, 'Post not found')

  // Check if the user has already liked the post
  const isLiked = findPost.likes.includes(userId)

  // If the user has already liked the post, unlike it
  if (isLiked) {
    await Post.updateOne(query, {
      $pull: { likes: userId },
    })
  } else {
    // If the user has not liked the post, like it
    await Post.updateOne(query, {
      $addToSet: { likes: userId },
    })
  }

  // Return the updated post
  return Post.findById(query)
}

// my liked posts
const getMyLikedPosts = async (userId: string): Promise<IPost[]> => {
  const likedPosts = await Post.find({ likes: userId })
    .populate('author', 'name email avatar')
    .sort('-createdAt')

  const user = await User.findById(userId).select('bookmarks')

  // If the user is not found, throw an error
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

  // Add the isLiked property to each post
  const likedPostsWithIsLiked = likedPosts.map(post => {
    const isLiked = post.likes.includes(userId)
    const isBookmarked = user.bookmarks.includes(String(post._id))
    return { ...post.toJSON(), isLiked, isBookmarked }
  })

  return likedPostsWithIsLiked
}

// my bookmarked posts
const getMyBookmarkedPosts = async (userId: string): Promise<IPost[]> => {
  const myBookmarks = await User.findById(userId)
    .select('bookmarks -_id')
    .populate('bookmarks', '')

  // Add the isLiked property to each post
  const bookmarkedPostsWithIsLikedAndBookmarked = myBookmarks?.bookmarks
    ? myBookmarks.bookmarks.map(post => {
        const singlePost = JSON.parse(JSON.stringify(post))
        const isLiked = singlePost.likes.includes(userId)
        singlePost.isBookmarked = true
        return { ...singlePost, isLiked }
      })
    : []

  return bookmarkedPostsWithIsLikedAndBookmarked
}

export const PostService = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getMyPosts,
  getAllPosts,
  likeAPost,
  getMyLikedPosts,
  getMyBookmarkedPosts,
}
