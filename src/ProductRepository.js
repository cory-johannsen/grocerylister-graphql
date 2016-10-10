import Product from './Product'
import Department from './Department'

function fetchProducts(database, query, parameters) {
  return database.query(query, parameters)
    .then((results) => {
      return results.rows.map((row) => {
        const department = new Department(row.department_id, row.department_name)
        return new Product(row.id, row.name, department)
      })
    })
}

export default class ProductRepository {
  constructor(database) {
    this.database = database
  }

  findAll() {
    return fetchProducts(this.database,
      'SELECT p.*, d.id AS department_id, d.name AS department_name FROM product p JOIN department d ON p.department_id=d.id', [])
  }

  findById(id) {
    return fetchProducts(this.database,
      'SELECT p.*, d.id AS department_id, d.name AS department_name FROM product p JOIN department d ON p.department_id=d.id WHERE p.id=$1', [id])
  }

  findByName(name) {
    return fetchProducts(this.database,
      'SELECT p.*, d.id AS department_id, d.name AS department_name FROM product p JOIN department d ON p.department_id=d.id WHERE p.name=$1', [name])
  }

}
