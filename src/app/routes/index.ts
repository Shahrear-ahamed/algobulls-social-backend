import { Router } from 'express'
import { AuthRoutes } from '../modules/auth/auth.routes'
import { PostRoutes } from '../modules/post/post.routes'

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
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
