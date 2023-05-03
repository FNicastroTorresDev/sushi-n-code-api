import { Router } from 'express'
import {
  getAllOrders,
  getOneOrder,
  createOneOrder,
  updateOneOrder,
  deleteOneOrder
} from '../controllers/order.controllers.js'
import { validateToken } from '../middlewares/validateToken.js'

const router = Router()

router
  .get('/', [
    validateToken
  ],getAllOrders)
  .get('/:orderId', getOneOrder)
  .post('/', createOneOrder)
  .patch('/:orderId', updateOneOrder)
  .patch('/', updateOneOrder)
  .delete('/:orderId', deleteOneOrder)
  .delete('/', deleteOneOrder)

export default router