import { Router } from 'express'
import {
  getAllCategories,
  getOneCategory,
  createOneCategory,
  updateOneCategory,
  deleteOneCategory
} from '../controllers/category.controllers.js'

const router = Router()

router
  .get('/', getAllCategories)
  .get('/:categoryId', getOneCategory)
  .post('/', createOneCategory)
  .patch('/:categoryId', updateOneCategory)
  .delete('/:categoryId', deleteOneCategory)

export default router