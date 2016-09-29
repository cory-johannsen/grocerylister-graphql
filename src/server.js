import express from 'express'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'

import schema from './schema'
import Database from './Database'
import DepartmentRepository from './DepartmentRepository'
import ProductRepository from './ProductRepository'
import StoreRepository from './StoreRepository'

const port = process.env.PORT || 3000

const database = new Database()
const departmentRepository = new DepartmentRepository(database)
const productRepository = new ProductRepository(database, departmentRepository)
const storeRepository = new StoreRepository(database, departmentRepository)

// The root provides a resolver function for each API endpoint
const root = {
  departments: () => {
    console.log("Processing request: departments")
    return departmentRepository.findAll()
  },

  products: () => {
    console.log("Processing request: products")
    return productRepository.findAll()
  },

  stores: () => {
    console.log("Processing request: stores")
    return storeRepository.findAll()
  },


}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(port)

console.log(`Running a GraphQL API server at localhost:${port}/graphql`)
