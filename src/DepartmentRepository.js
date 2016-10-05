import Department from './Department'


function fetchDepartments(database, query, parameters) {
  return database.query(query, parameters)
    .then((results) => {
      return results.rows.map((row) => {
        return new Department(row.id, row.name)
      })
    })
}

export default class DepartmentRepository {
  constructor(database) {
    this.database = database
  }

  findAll() {
    return fetchDepartments(this.database, 'SELECT * FROM department', [])
  }

  findById(id) {
    return fetchDepartments(this.database, 'SELECT * FROM department WHERE id=$1', [id])
  }

  findByName(name) {
    return fetchDepartments(this.database, 'SELECT * FROM department WHERE name=$1', [name])
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
