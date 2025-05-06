import express, {
  Express,
  Response as ExResponse,
  Request as ExRequest,
  Router,
  ErrorRequestHandler,
  NextFunction,
} from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import {RegisterRoutes} from '../build/routes'

const app: Express = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/v0/police/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  res.send(
    swaggerUi.generateHTML(await import('../build/swagger.json'))
  )
})

const router = Router()
RegisterRoutes(router)
app.use('/api/v0/police', router)

const errorHandler: ErrorRequestHandler = (err, _req, res, _next: NextFunction) => {
  res.status(err.status).json( {
    message: err.message,
    errors: err.errors,
    status: err.status
  })
  _next()
}
app.use(errorHandler)

export default app
