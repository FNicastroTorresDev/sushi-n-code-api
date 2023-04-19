import express from 'express'
import cors from 'cors'
import { 
  menuRoutes, 
  userRoutes,
  orderRoutes,
  categoryRoutes
} from './routes/index.js'

export class Server {
  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
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
  }

  listen(port) {
    this.app.listen(port, () => {
      console.log(`🚀 Servidor en puerto ${port}`)
    })
  }
}