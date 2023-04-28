import { Router } from 'express'
import {
  getAllOrders,
  getOneOrder,
  createOneOrder,
  updateOneOrder,
  deleteOneOrder
} from '../controllers/order.controllers.js'

const router = Router()

router
  .get('/', getAllOrders)
  .get('/:orderId', getOneOrder)
  .post('/', createOneOrder)
  .patch('/:orderId', updateOneOrder)
  .patch('/', updateOneOrder)
  .delete('/:orderId', deleteOneOrder)
  .delete('/', deleteOneOrder)

export default router