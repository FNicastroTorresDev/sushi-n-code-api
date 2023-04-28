import express from 'express'
import cors from 'cors'
import { 
  menuRoutes, 
  userRoutes,
  orderRoutes,
  categoryRoutes,
  loginRoutes
} from './routes/index.js'
import { dbConnection } from './db/config.js'

export class Server {
  constructor() {
    this.app = express()
    this.connectionDb()
    this.middlewares()
    this.routes()
  }

  async connectionDb() {
    await dbConnection()
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(cors())
  }

  routes() {
    this.app.use('/api/users', userRoutes)
    this.app.use('/api/menues', menuRoutes)
    this.app.use('/api/orders', orderRoutes)
    this.app.use('/api/categories', categoryRoutes)
    this.app.use('/api/login', loginRoutes)
  }

  listen(port) {
    this.app.listen(port, () => {
      console.log(`🚀 Servidor en puerto ${port}`)
    })
  }
}