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

const query = 'SELECT p.*, d.id AS department_id, d.name AS department_name FROM product p JOIN department d ON p.department_id=d.id'

export default class ProductRepository {
  constructor(database) {
    this.database = database
  }

  findAll() {
    return fetchProducts(this.database, query, [])
  }

  findById(id) {
    return fetchProducts(this.database, query + ' WHERE p.id=$1', [id])
      .then((results) => {
        if (results.length >= 1) {
          return results[0]
        }
      })
      .catch((error) => {
        console.log('ProductRepository.findById error:', error)
        return error
      })
  }

  findByName(name) {
    return fetchProducts(this.database, query + ' WHERE p.name=$1', [name])
      .then((results) => {
        if (results.length >= 1) {
          return results[0]
        }
      })
      .catch((error) => {
        console.log('ProductRepository.findByName error:', error)
        return error
      })
  }

  create(name, departmentId) {
    return this.database.query('INSERT INTO product (name, department_id) VALUES ($1, $2)', [name, departmentId])
      .then((result) => {
        return this.findByName(name)
      })
      .catch((error) => {
        console.log('ProductRepository.create error:', error)
        return error
      })
  }

}
