import { ENV } from './config'
import knex from 'knex'

export const conn = knex({
  client: 'mysql',
  useNullAsDefault: true,
  connection: {
    host: ENV.DB_HOST,
    database: ENV.DB_NAME,
    port: ENV.DB_PORT,
    user: ENV.DB_USER,
    password: ENV.DB_PASS
  }
})
