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

  create(departmentName) {
    console.log('DepartmentRepository.create:', departmentName)
    const query = 'INSERT INTO department (name) VALUES($1)'
    console.log('DepartmentRepository.create: query:', query)
    return this.database.query(query, [departmentName])
      .then((results) => {
        return this.findByName(departmentName)
      }).catch(e => {
        console.log(e)
        return e
      })
  }

}
