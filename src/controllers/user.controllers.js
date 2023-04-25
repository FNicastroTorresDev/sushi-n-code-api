import { encryptPassword } from '../helpers/encryptPassword.js'
import User from '../model/User.js'

export const getAllUsers = async (req, res) => {
  const { limit = 10, from = 0 } = req.query

  try {
    const [  allUsers, total ] = await Promise.all([
      User.find({})
        .skip(from)
        .limit(limit),
      User.count()
    ])
    return res.status(201).send({
      total: total,
      data: allUsers
    })
  } catch (err) {
    return res.status(500).send({
      message: 'Error al obtener los usuarios.',
      error: err.message
    })
  }
}

export const getOneUser = async (req, res) => {
  const {userId} = req.params
  
  try {
    const foundUser = await User.findById(userId)
    if (foundUser) {
      return res.status(201).send({
        user: foundUser
      })
    }
  } catch (err) {
    return res.status(500).send({
      message: 'Error al obtener el usuario.',
      error: err.message
    })
  }

  return res.status(404).send({
    message: 'El usuario no existe.'
  })
}

export const createOneUser = async (req, res) => {
  const { 
    fullname,
    email,
    password,
    state,
    role
  } = req.body

  if (
    !fullname ||
    !email ||
    !password
  ) {
    return res.status(400).send({
      message: 'Faltan datos.'
    })
  }

  const existEmail = await User.findOne({ email: email })

  if (existEmail) {
    return res.status(400).send({
      message: 'El email ya existe.'
    })
  }
  
  const hash = encryptPassword(password)

  const user = await User({
    fullname,
    email,
    password: hash,
    state,
    role
  })

  try {
    await user.save()
    return res.status(201).send({
      message: `Creado el usuario ${email}.`
    })
  } catch (error) {
    return res.status(400).send({
      message: 'Error al crear el usuario.',
      fields: {
        fullname: error.errors?.fullname?.message,
        email: error.errors?.email?.message,
        password: error.errors?.password?.message
      }
    })
  }
}

export const updateOneUser = async (req, res) => {
  const { params: { userId }, body } = req

  if (
    !userId ||
    Object.keys(body).length === 0
    ) {
    return res.status(400).send({
      message: 'Faltan datos. Body vacío o sin id en la solicitud.'
    })
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, body, { returnDocument: 'after' })
    if (updatedUser) {
      return res.status(201).send({
        message: 'Actualizado un usuario.',
        data: updatedUser
      })
    }
  } catch (error) {
    return res.status(404).send({
      message: 'El usuario no existe.',
      error: error.message
    })
  } 
}

export const deleteOneUser = async (req, res) => {
  const { userId } = req.params

  if (!userId) {
    return res.status(400).send({
      message: 'Sin id en la solicitud.'
    })
  }

  try {
    const deletedUser = await User.findByIdAndDelete({  _id: userId})
    if (deletedUser) {
      return res.status(201).send({
        message: 'El usuario ha sido eliminado.',
        data: deletedUser
      })
    }
  } catch (error) {
    return res.status(500).send({
      message: 'El usuario no existe.',
      error: error.message
    })
  }
}