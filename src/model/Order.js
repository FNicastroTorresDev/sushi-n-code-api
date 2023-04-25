import { model, Schema } from 'mongoose'

const OrderSchema = new Schema({
  user: {
    type: String,
    required: [true, 'El usuario es requerido.']
  },
  date: {
    type: Date,
    required: [true, 'La fecha es requerida.']
  },
  menu: {
    type: String,
    required: [true, 'El menú es requerido.']
  },
  state: {
    type: String,
    default: 'Pendiente'
  }
})

export default model('orders', OrderSchema)
