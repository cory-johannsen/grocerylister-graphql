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

  type GroceryList {
    id: Int!
    name: String!
    products: [Product!]
    store: Store!
  }

  type Query {
    departments: [Department!]
    products: [Product!]
    stores: [Store!]
    groceryLists: [GroceryList!]
  }

  type Mutation {
    addDepartmentToStore(departmentName: String!, storeId: Int!): Store!
    updateDepartmentsForStore(departmentIds: [Int!], storeId: Int!): Store!
  }

`)

export default schema
