import GroceryList from './GroceryList'
import Department from './Department'
import Product from './Product'

function fetchGroceryLists(database, query, parameters) {
  return database.query(query, parameters)
    .then((resultSet) => {
      const groceryLists = {}
      resultSet.rows.forEach((row) => {
        console.log(row)
        let groceryList = groceryLists[row.id]
        if (!groceryList) {
          groceryList = new GroceryList(row.id, row.name, [])
          groceryLists[row.id] = groceryList
        }
        if (row.department_id && row.department_name && row.product_id && row.product_name) {
          const department = new Department(row.department_id, row.department_name)
          const product = new Product(row.product_id, row.product_name, department)
          groceryList.products.push(product)
        }
      })
      return Object.keys(groceryLists).map((key) => {
        return groceryLists[key]
      })
    })
    .catch((error) => {
      console.log('fetchGroceryLists error:', error)
      return error
    })
}

const query = 'SELECT g.*, p.id AS product_id, p.name AS product_name, ' +
              'd.id AS department_id, d.name AS department_name FROM grocery_list g ' +
              'LEFT OUTER JOIN grocery_list_product glp ON g.id=glp.grocery_list_id ' +
              'LEFT OUTER JOIN product p ON glp.product_id=p.id ' +
              'LEFT OUTER JOIN department d ON p.department_id=d.id'

export default class GroceryListRepository {
  constructor(database) {
    this.database = database
  }

  findAll() {
    return fetchGroceryLists(this.database, query, [])
  }

  findById(id) {
    return fetchGroceryLists(this.database, query + ' WHERE g.id=$1', [id])
      .then((results) => {
        if (results.length > 0) {
          return results[0]
        }
      })
  }

  findByName(name) {
    return fetchGroceryLists(this.database, query + ' WHERE name=$1', [name])
      .then((results) => {
        if (results.length > 0) {
          return results[0]
        }
      })
  }

  findByStoreId(storeId) {
    return fetchGroceryLists(this.database, query +
      ' LEFT OUTER JOIN store s ON g.id=s.grocery_list_id WHERE s.id=$1', [storeId])
      .then((results) => {
        if (results.length > 0) {
          return results[0]
        }
      })
      .catch((error) => {
        console.log('findByStoreId error:', error)
        return error
      })
  }

  update(groceryList) {
    // update the grocery list data
    // console.log('StoreRepository.update: store:', store)
    return this.database.query('UPDATE grocery_list SET name=$1 WHERE id=$2', [groceryList.name, groceryList.id])
      .then((resultSet) => {
        // Remove the product mappings
        return this.database.query('DELETE FROM grocery_list_product WHERE grocery_list_id=$1', [groceryList.id])
          .then((resultSet) => {
            // Insert the new product mappings
            groceryList.products.map((product) => {
              // console.log('StoreRepository.update: inserting store_department values:', [store.id, department.id, index])
              this.database.query('INSERT INTO grocery_list_product (grocery_list_id, product_id) VALUES ($1, $2)', [groceryList.id, product.id])
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
