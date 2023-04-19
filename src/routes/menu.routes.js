import { Router } from 'express'
import { 
  createOneMenu,
  deleteOneMenu,
  getAllMenues, 
  getOneMenu,
  updateOneMenu
} from '../controllers/menu.controllers.js'

const router = Router()

router
  .get('/', getAllMenues)
  .get('/:menuId', getOneMenu)
  .post('/', createOneMenu)
  .patch('/:menuId', updateOneMenu)
  .delete('/:menuId', deleteOneMenu)

export default router