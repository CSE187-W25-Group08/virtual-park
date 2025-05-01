import express, {
  Express,
} from 'express'

import path from 'path'
import { createHandler } from 'graphql-http/lib/use/express'
import expressPlayground from "graphql-playground-middleware-express"
import 'reflect-metadata' // must come before buildSchema
import { buildSchema } from "type-graphql"

import { resolvers } from './resolvers'
import { expressAuthChecker } from './auth/checker'

const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: resolvers,
    validate: true,
    authChecker: expressAuthChecker,
    emitSchemaFile: {
      path: path.resolve(__dirname, "../build/schema.gql"),
      sortedSchema: true,
    }
  })
  app.use(
    "/graphql",
    createHandler({
      schema: schema,
      context: (req) => ({
        headers: req.headers
      }),
    })
  )
  app.get("/playground", expressPlayground({ endpoint: "/graphql" }))
}

export { app, bootstrap }