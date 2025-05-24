import express, { 
  Express, 
  Router,
  Response as ExResponse, 
  Request as ExRequest, 
  ErrorRequestHandler,
  NextFunction
} from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import { RegisterRoutes } from "../build/routes"

const app: Express = express()
app.use(cors())

// For Stripe webhook raw body parsing
app.use('/webhook/', express.raw({ type: '*/*', limit: '10mb' }))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: false }))

app.use('/api/v0/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  res.send(swaggerUi.generateHTML(await import('../build/swagger.json')))
})

const router = Router()
RegisterRoutes(router)
app.use(router)  // Mount routes at root (no /api/v0 prefix)

const errorHandler: ErrorRequestHandler = (err, _req, res, _next: NextFunction) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  })
  _next()
}
app.use(errorHandler)

export default app
