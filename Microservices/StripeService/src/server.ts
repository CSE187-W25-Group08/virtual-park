import dotenv from 'dotenv'
dotenv.config()

import { app, bootstrap } from './app'

app.listen(4060, async () => {
  await bootstrap()
  console.log('Running GraphQL Task Service at http://localhost:4060')
  console.log('GraphQL Playground: http://localhost:4060/playground')
})