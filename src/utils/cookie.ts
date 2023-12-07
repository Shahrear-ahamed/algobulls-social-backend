import { Response } from 'express'
import config from '../config'

const setCookie = (res: Response, token: string, days: number) => {
  const options = {
    httpOnly: true,
    secure: config.env === 'production',
    maxAge: 1000 * 60 * 60 * 24 * days,
  }
  res.cookie('refreshToken', token, options)
}

export const Cookie = {
  setCookie,
}
