import dotenv from 'dotenv'
dotenv.config()

import { app, bootstrap } from './app'

app.listen(4070, async () => {
  await bootstrap()
  console.log('Running GraphQL Task Service at http://localhost:4070')
  console.log('GraphQL Playground: http://localhost:4070/playground')
})