import Store from './Store'
import Department from './Department'

function fetchStores(database, query, parameters) {
  return database.query(query, parameters)
    .then((results) => {
      const stores = new Map()
      results.rows.map((row) => {
        let store = stores.get(row.id)
        if (!store) {
          store = new Store(row.id, row.name, row.groceryListId, [])
          stores.set(row.id, store)
        }
        const department = new Department(row.department_id, row.department_name)
        store.departments.splice(row.department_index, 0, department)
      })
      return stores.values()
    })
}

export default class StoreRepository {
  constructor(database) {
    this.database = database
  }

  findAll() {
    return fetchStores(this.database,
      'SELECT s.*, sd.index AS department_index, d.id AS department_id, d.name AS department_name ' +
      'FROM store s JOIN store_department sd ON s.id=sd.store_id ' +
      'JOIN department d ON sd.department_id=d.id ORDER BY s.name, sd.index')
  }

  findById(id) {
    return this.database.query(this.database,
      'SELECT s.*, sd.index AS department_index, d.id AS department_id, d.name AS department_name ' +
      'FROM store s JOIN store_department sd ON s.id=sd.store_id ' +
      'JOIN department d ON sd.department_id=d.id WHERE s.id=$1 ORDER BY s.name, sd.index', [id])
  }

  findByName(name) {
    return this.database.query(this.database,
      'SELECT s.*, sd.index AS department_index, d.id AS department_id, d.name AS department_name ' +
      'FROM store s JOIN store_department sd ON s.id=sd.store_id ' +
      'JOIN department d ON sd.department_id=d.id WHERE s.name=$1 ORDER BY s.name, sd.index', [name])
  }
}
