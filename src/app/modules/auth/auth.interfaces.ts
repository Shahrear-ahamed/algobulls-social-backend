export type IUser = {
  name: string
  email: string
  password: string
  avatar?: string
  bookmarks: string[]
}

export type IReturnToken = {
  accessToken: string
  refreshToken: string
}

export type IChangePassword = {
  oldPassword: string
  newPassword: string
}
