import Product from './Product'

export default class ProductRepository {
  constructor(database, departmentRepository) {
    this.database = database
    this.departmentRepository = departmentRepository
  }

  findAll() {
    return this.database.query('SELECT * FROM product')
      .then((results) => {
        return results.rows.map((row) => {
          const department = this.departmentRepository.findById(row.department_id)
          console.log('product:', row.name, ' department:', department)
          return new Product(row.id, row.name, department)
        })
      })
  }

  findById(id) {
    return this.database.query('SELECT * FROM product WHERE id=$1', [id])
      .then((results) => {
        return results.rows.map((row) => {
          const department = this.departmentRepository.findById(row.department_id)
          return new Product(row.id, row.name, department)
        })
      })
  }

  findByName(name) {
    return this.database.query('SELECT * FROM product WHERE name=$1', [name])
      .then((results) => {
        return results.rows.map((row) => {
          const department = this.departmentRepository.findById(row.department_id)
          return new Product(row.id, row.name, department)
        })
      })
  }

}
