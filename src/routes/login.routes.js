import { Router } from 'express'
import { authentication, validateOk } from '../controllers/login.controllers.js'
import { validateToken } from '../middlewares/validateToken.js'

const router = Router()

router
  .post('/', authentication)
  .post('/validate', [ validateToken ] ,validateOk)

export default router