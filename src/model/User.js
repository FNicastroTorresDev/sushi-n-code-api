import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida']
  },
  state: {
    type: String,
    default: 'Activo'
  },
  role: {
    type: String,
    default: 'user'
  }
})

export default model('users', UserSchema)