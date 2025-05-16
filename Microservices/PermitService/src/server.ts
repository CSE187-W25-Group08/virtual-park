import dotenv from 'dotenv'
dotenv.config()

import { app, bootstrap } from './app'

import cors from 'cors'

/* reference: https://www.stackhawk.com/blog/typescript-cors-guide-what-it-is-and-how-to-enable-it/ */
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true               
}))

app.listen(4000, async () => {
  await bootstrap()
  console.log('Running GraphQL Task Service at http://localhost:4000')
  console.log('GraphQL Playground: http://localhost:4000/playground')
})