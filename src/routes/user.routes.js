import { Router } from 'express'
import {
  getAllUsers,
  getOneUser,
  createOneUser,
  updateOneUser,
  deleteOneUser
} from '../controllers/user.controllers.js'

const router = Router()

router
  .get('/', getAllUsers)
  .get('/:userId', getOneUser)
  .post('/', createOneUser)
  .patch('/:userId', updateOneUser)
  .delete('/:userId', deleteOneUser)

export default router