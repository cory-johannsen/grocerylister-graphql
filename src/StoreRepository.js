import Store from './Store'
import Department from './Department'

function fetchStores(database, query, parameters) {
  // console.log('fetchStores entered: query:', query, ', parameters:', parameters)
  return database.query(query, parameters)
    .then((resultSet) => {
      const stores = new Map()
      resultSet.rows.forEach((row) => {
        let store = stores.get(row.id)
        if (!store) {
          store = new Store(row.id, row.name, row.grocery_list_id, [])
          stores.set(row.id, store)
        }
        if(row.department_id && row.department_name) {
          const department = new Department(row.department_id, row.department_name)
          store.departments.splice(row.department_index, 0, department)
        }
      })
      const results = []
      stores.forEach((value, key, map) => {
        // console.log('fetchStore returning entry', key, value)
        results.push(value)
      })
      return results
    })
    .catch((error) => {
      console.log('fetchStores error:', error)
      return error
    })
}

const query =
  'SELECT s.id AS id, s.name AS name, sd.index AS department_index, d.id AS department_id, d.name AS department_name ' +
  'FROM store s LEFT OUTER JOIN store_department sd ON s.id=sd.store_id ' +
  'LEFT OUTER JOIN department d ON sd.department_id=d.id'

export default class StoreRepository {
  constructor(database) {
    this.database = database
  }

  findAll() {
    return fetchStores(this.database, query + ' ORDER BY s.name, sd.index')
  }

  findById(id) {
    return fetchStores(this.database, query + ' WHERE s.id=$1 ORDER BY s.name, sd.index', [id])
      .then((results) => {
        // console.log('StoreRepository.findById - results', results)
        if(results.length > 0) {
          // console.log('StoreRepository.findById - returning', results[0])
          return results[0]
        }
      }).catch((error) => {
        console.log('findById error:', error)
        return error
      })
  }

  findByName(name) {
    return fetchStores(this.database, query + ' WHERE s.name=$1 ORDER BY s.name, sd.index', [id])
      .then((results) => {
        // console.log('StoreRepository.findByName - results', results)
        if(results.length > 0) {
          // console.log('StoreRepository.findByName - returning', results[0])
          return results[0]
        }
      }).catch((error) => {
        console.log('findByName error:', error)
        return error
      })
  }

  update(store) {
    // update the store data
    // console.log('StoreRepository.update: store:', store)
    return this.database.query('UPDATE store SET name=$1 WHERE id=$2', [store.name, store.id])
      .then((resultSet) => {
        // Remove the department mappings
        return this.database.query('DELETE FROM store_department WHERE store_id=$1', [store.id])
          .then((resultSet) => {
            // Insert the new department mappings
            store.departments.map((department, index) => {
              // console.log('StoreRepository.update: inserting store_department values:', [store.id, department.id, index])
              this.database.query('INSERT INTO store_department (store_id, department_id, index) VALUES ($1, $2, $3)', [store.id, department.id, index])
                .catch((error) => {
                  console.log('update error:', error)
                })
            })
          }).catch((error) => {
            console.log('update error:', error)
            return error
          })
      }).catch((error) => {
        console.log('update error:', error)
        return error
      })

  }
}
