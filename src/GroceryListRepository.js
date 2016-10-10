import GroceryList from './GroceryList'


function fetchGroceryLists(database, query, parameters) {
  return database.query(query, parameters)
    .then((results) => {
      return results.rows.map((row) => {
        console.log(row)
        return new GroceryList(row.id, row.name)
      })
    })
}

const query = 'SELECT g.*, p.id AS product_id, p.name AS product_name, ' +
              'd.id AS department_id, d.name AS department_name FROM grocery_list g ' +
              'JOIN grocery_list_product glp ON g.id=glp.grocery_list_id ' +
              'JOIN product p ON glp.product_id=p.id ' +
              'JOIN department d ON p.department_id=d.id'

export default class GroceryListRepository {
  constructor(database) {
    this.database = database
  }

  findAll() {
    return fetchGroceryLists(this.database, query, [])
  }

  findById(id) {
    return fetchGroceryLists(this.database, query + ' WHERE g.id=$1', [id])
  }

  findByName(name) {
    return fetchGroceryLists(this.database, query + ' WHERE name=$1', [name])
  }

  findByStoreId(storeId) {
    return fetchGroceryLists(this.database, query +
      ' JOIN store s ON g.id=s.grocery_list_id WHERE s.id=$1', [id])
  }

}
