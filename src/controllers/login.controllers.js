import { compareSync } from "bcrypt"
import jwt from 'jsonwebtoken'
import User from '../model/User.js'

export const authentication = async (req, res) => {
  const signature = process.env.SIGNATURE

  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).send({
      message: 'Usuario y/o contraseña incorrectos.' 
    })
  }

  const isMatch = compareSync(password, user.password)

  if (!isMatch) {
    return res.status(400).send({
      message: 'Usuario y/o contraseña incorrectos.'
    })
  }

  const payload = {
    id: user._id,
    email: user.email
  }

  const accessToken = jwt.sign(payload, signature, { expiresIn: '1h' })

  res.json({
    message: `Bienvenido/a ${user.fullname}.`,
    accessToken
  })
}