import bcrypt from 'bcrypt'
import config from '../config'

const hashedPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(config.saltRound))
}

const comparePassword = async (
  givenPass: string,
  storedPass: string,
): Promise<boolean> => {
  return await bcrypt.compare(givenPass, storedPass)
}

export const BcryptPassword = {
  hashedPassword,
  comparePassword,
}
