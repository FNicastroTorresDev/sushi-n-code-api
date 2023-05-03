import { Router } from 'express'
import {
  getAllUsers,
  getOneUser,
  createOneUser,
  updateOneUser,
  deleteOneUser
} from '../controllers/user.controllers.js'
import { validateToken } from '../middlewares/validateToken.js'

const router = Router()

router
  .get('/', 
  [
    validateToken
  ]
  , getAllUsers)
  .get('/:userId', getOneUser)
  .post('/', createOneUser)
  .patch('/', updateOneUser)
  .patch('/:userId', [
    validateToken
  ], updateOneUser)
  .delete('/', deleteOneUser)
  .delete('/:userId', deleteOneUser)

export default router