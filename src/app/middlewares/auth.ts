import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import { jwtHelpers } from '../../helpers/jwtHelpers'

const auth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized', '')
    }

    // verify token
    let verifiedUser = null
    verifiedUser = await jwtHelpers.verifyToken(
      token,
      config.jwt.secret as string,
    )

    req.user = verifiedUser

    next()
  } catch (error) {
    next(error)
  }
}

export default auth
