import User from '../model/User.js'
import Menu from '../model/Menu.js'
import Category from '../model/Category.js'

export const userExists = async (userToValidate) => {
  return await User.findOne({ email: userToValidate})
}

export const menuExists = async (menuToValidate) => {
  return await Menu.findOne({ name: menuToValidate})
}

export const menuesExists = async (menuesToValidate) => {
  menuesToValidate.map( menu => {
    if (!menuExists(menu.name)) {
      return false
    }
  })
  return true
}

export const categoryExists = (categoryToValidate) => {
  return Category.findOne({ name: categoryToValidate})
}