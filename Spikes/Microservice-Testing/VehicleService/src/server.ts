import dotenv from 'dotenv'
dotenv.config()

import { app, bootstrap } from './app'

app.listen(4000, async () => {
  await bootstrap()
  console.log('Running GraphQL Task Service at http://localhost:4000')
  console.log('GraphQL Playground: http://localhost:4000/playground')
})
