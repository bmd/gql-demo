import { ENV } from '../config/env.config';
const Knex = require('knex');
const { Model } = require('objection');

// Initialize knex.
export const knex = Knex({
  client: 'mysql',
  useNullAsDefault: true,
  connection: {
    host: ENV.DB_HOST,
    database: ENV.DB_NAME,
    port: ENV.DB_PORT,
    user: ENV.DB_USER,
    password: ENV.DB_PASS,
  }
});

Model.knex(knex);

export { Department } from './department';
