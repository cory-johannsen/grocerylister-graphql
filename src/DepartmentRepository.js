import Department from './Department'

export default class DepartmentRepository {
  constructor(database) {
    this.database = database
  }

  findAll() {
    return this.database.query('SELECT * FROM department')
      .then((results) => {
        return results.rows.map((row) => {
          return new Department(row.id, row.name)
        })
      })
  }

  findById(id) {
    return this.database.query('SELECT * FROM department WHERE id=$1', [id])
      .then((results) => {
        return results.rows.map((row) => {
          return new Department(row.id, row.name)
        })
      })
  }

  findByName(name) {
    return this.database.query('SELECT * FROM department WHERE name=$1', [name])
      .then((results) => {
        return results.rows.map((row) => {
          return new Department(row.id, row.name)
        })
      })
  }

  findByStoreId(storeId) {
    return this.database.query(
      'SELECT d.*,s.index FROM department d JOIN store_department s ON d.id=s.department_id WHERE s.store_id=$1 ORDER BY s.index', [storeId])
      .then((results) => {
        return results.rows.map((row) => {
          return new Department(row.id, row.name)
        })
      })
  }
}
