import { model, Schema } from 'mongoose'

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido.'],
    unique: true
  },
  state: {
    type: Boolean,
    default: true
  }
})