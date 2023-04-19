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
  .get('/:userId', getOneOrder)
  .post('/', createOneOrder)
  .patch('/:userId', updateOneOrder)
  .delete('/:userId', deleteOneOrder)

export default router