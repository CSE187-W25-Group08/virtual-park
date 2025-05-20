import dotenv from 'dotenv'
dotenv.config()

import { app, bootstrap } from './app'

// import cors from 'cors';

// app.use(cors({
//   origin: ['http://localhost:3000'],
//   credentials: true
// }));

app.listen(4010, async () => {
  await bootstrap()
  console.log('Running GraphQL Task Service at http://localhost:4010')
  console.log('GraphQL Playground: http://localhost:4010/playground')
})