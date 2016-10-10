import Department from './Department'


function fetchDepartments(database, query, parameters) {
  // console.log('fetchDepartments entered:', query, parameters)

  return database.query(query, parameters)
    .then((results) => {
      return results.rows.map((row) => {
        return new Department(row.id, row.name)
      })
    })
    .catch((error) => {
      console.log('fetchDepartments error:', error)
      return error
    })
}

const query = 'SELECT * FROM department'

export default class DepartmentRepository {
  constructor(database) {
    this.database = database
  }

  findAll() {
    return fetchDepartments(this.database, query, [])
  }

  findById(id) {
    return fetchDepartments(this.database, query + ' WHERE id=$1', [id])
      .then((results) => {
        if (results.length > 0) {
          return results[0]
        }
      })
  }

  findByName(name) {
    return fetchDepartments(this.database, query + ' WHERE name=$1', [name])
      .then((results) => {
        if (results.length > 0) {
          return results[0]
        }
      })
  }
  //
  // findByStoreId(storeId) {
  //   return this.database.query(
  //     'SELECT d.*,s.index FROM department d JOIN store_department s ON d.id=s.department_id WHERE s.store_id=$1 ORDER BY s.index', [storeId])
  //     .then((results) => {
  //       return results.rows.map((row) => {
  //         return new Department(row.id, row.name)
  //       })
  //     })
  // }

  create(departmentName) {
    return this.database.query(
        'INSERT INTO department (name) VALUES($1)', [departmentName])
        .then((results) => {
          const row = results.rows[0]
          console.log(row)

      })
  }

}
