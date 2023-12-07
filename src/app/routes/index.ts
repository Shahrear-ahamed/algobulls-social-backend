import { Router } from 'express'
import { AuthRoutes } from '../modules/auth/auth.routes'
import { PostRoutes } from '../modules/post/post.routes'
import { CommentRoutes } from '../modules/comment/comment.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
