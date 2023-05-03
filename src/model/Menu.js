import { model, Schema } from 'mongoose'

const MenuSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido.'],
    unique: true
  },
  imgUrl: {
    type: String,
    required: [true, 'La imagen es requerida.']
  },
  state: {
    type: String,
    default: 'Disponible'
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido.']
  },
  details: {
    type: String
  },
  category: {
    type: String
  }
})

export default model('menues', MenuSchema)