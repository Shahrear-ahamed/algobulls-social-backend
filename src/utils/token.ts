import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../config'
import { Types } from 'mongoose'

type IToken = {
  id: Types.ObjectId
  email: string
}

const generateToken = async (payload: IToken) => {
  return jwt.sign(payload, config.jwt.secret as string, {
    expiresIn: config.jwt.expires_in,
  })
}

const generateRefreshToken = async (payload: IToken) => {
  return jwt.sign(payload, config.jwt.refresh_token_secret as string, {
    expiresIn: config.jwt.refresh_token_expires_in,
  })
}

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}

export const TokenServices = {
  verifyToken,
  generateToken,
  generateRefreshToken,
}
