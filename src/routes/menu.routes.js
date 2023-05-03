import { Router } from 'express'
import { 
  createOneMenu,
  deleteOneMenu,
  getAllMenues, 
  getOneMenu,
  updateOneMenu
} from '../controllers/menu.controllers.js'
import { validateToken } from '../middlewares/validateToken.js'

const router = Router()

router
  .get('/', [
    validateToken
  ], getAllMenues)
  .get('/:menuId', getOneMenu)
  .post('/', createOneMenu)
  .patch('/:menuId', updateOneMenu)
  .patch('/', updateOneMenu)
  .delete('/:menuId', deleteOneMenu)
  .delete('/', deleteOneMenu)

export default router