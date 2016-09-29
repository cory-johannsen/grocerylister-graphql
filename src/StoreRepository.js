import Store from './Store'

export default class StoreRepository {
  constructor(database, departmentRepository) {
    this.database = database
    this.departmentRepository = departmentRepository
  }

  findAll() {
    return this.database.query('SELECT * FROM store')
      .then((results) => {
        return results.rows.map((row) => {
          const departments = this.departmentRepository.findByStoreId(row.id)
          return new Store(row.id, row.name, row.groceryListId, departments)
        })
      })
  }

  findById(id) {
    return this.database.query('SELECT * FROM store WHERE id=$1', [id])
      .then((results) => {
        return results.rows.map((row) => {
          const departments = this.departmentRepository.findByStoreId(row.id)
          return new Store(row.id, row.name, row.groceryListId, departments)
        })
      })
  }

  findByName(name) {
    return this.database.query('SELECT * FROM store WHERE name=$1', [name])
      .then((results) => {
        return results.rows.map((row) => {
          const departments = this.departmentRepository.findByStoreId(row.id)
          return new Store(row.id, row.name, row.groceryListId, departments)
        })
      })
  }
}
