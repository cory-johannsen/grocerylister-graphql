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
    groceryList: GroceryList!
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
    groceryList(storeId: Int!): GroceryList!
  }

  input DepartmentInput {
    id: Int!
    name: String!
  }

  type Mutation {
    addDepartmentToStore(departmentName: String!, storeId: Int!): Store!
    updateDepartmentsForStore(departments: [DepartmentInput!], storeId: Int!): Store!

    addProduct(name: String!, departmentId: Int!): Product!

    addProductToGroceryList(productId: Int!, groceryListId: Int!): GroceryList!
    removeProductFromGroceryList(productId: Int!, groceryListId: Int!): GroceryList!
  }

`)

export default schema
