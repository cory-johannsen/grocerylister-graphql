import Pool from 'pg-pool'

export default class Database {

  constructor() {
    this.pool = new Pool({
      database: 'grocerylister',
      user: 'grocerylister',
      password: 'grocerylister',
      ssl: false,
      max: 20, // set pool max size to 20
      min: 1,  // set min pool size to 1
      idleTimeoutMillis: 1000 // close idle clients after 1 second
    })
  }

  query = (text, values) => {
    // console.log(`Database.query: \"${text}\" ${values}`)
    return this.pool.query(text, values)
  }
}
