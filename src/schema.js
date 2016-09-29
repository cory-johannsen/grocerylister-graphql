import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type Department {
    id: Int!
    name: String!
  }

  type Product {
    id: Int!
    name: String!
    department: Department!
  }

  type Store {
    id: Int!
    name: String!
    departments: [Department!]
  }

  type Query {
    departments: [Department!]
    products: [Product!]
    stores: [Store!]
  }

`)

export default schema
