import bcrypt from 'bcrypt'

export const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync()

  return bcrypt.hashSync(password, salt)
}