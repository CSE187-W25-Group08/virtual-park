import express, { 
  Express, 
  Router,
  Response as ExResponse, 
  Request as ExRequest, 
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction
} from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import {RegisterRoutes} from '../build/routes'

const app: Express = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// app.get('/v0/police', (_req: ExRequest, res: ExResponse) => {
//   res.json({
//     message: 'The Virtual-Park Campus Police API is currently online',
//     version: 'v0',
//     docs: '/v0/police/docs'
//   })
// })


app.use('/v0/police/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  res.send(
    swaggerUi.generateHTML(await import('../build/swagger.json'))
  )
})

const router = Router()
RegisterRoutes(router)
app.use('/api/v0', router)

// 404 handler for unmatched routes
// Disable lint for unused `next` param
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} does not exist`
  })
})

// Central error handler for thrown errors
// Disable lint for unused `next` param
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: status === 400 ? 'Bad Request: Missing or invalid query parameter' : err.message || 'Internal Server Error',
    errors: err.errors || [],
    status,
  });
};

app.use(errorHandler)

export default app
